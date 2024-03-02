from fastapi import APIRouter, Depends
from elasticsearch import Elasticsearch
from pydantic import BaseModel, ConfigDict, Field, field_validator

from backend.dependencies import get_db
from backend.schemas.enums import DataType
from backend.mappings import get_mappings
from backend.mappings.analyzers import Analyzer, get_analyzer

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={418: {"description": "I'm a teapot"}},
)


class Dataset(BaseModel):
    index_prefix: str|None = Field("triage", description="The prefix for the index name")
    index_name: str = Field(..., description="The name of the index")
    index_suffix: str|None = Field(None, description="The suffix for the index name")
    by_type: bool = Field(False, description="Whether to create multiple indexes by data type")
    data_types: list[DataType] = Field([], description="The data types to create indexes for")
    analyzer: Analyzer|None = Field(None, description="The analyzer to use for the index")
    num_shards: int = Field(1, description="The number of shards for the index")
    num_replicas: int = Field(0, description="The number of replicas for the index")
    model_config: ConfigDict = {
        "json_schema_extra": {
            "examples": [
                {
                    "index_prefix": "triage",
                    "index_name": "test",
                    "index_suffix": None,
                    "by_type": False,
                    "analyzer": "russian_english",
                    "num_shards": 2,
                    "num_replicas": 1
                }
            ]
        }
    }


    @field_validator("data_types")
    def check_data_types(cls, v, values):
        if values["by_type"] and not v:
            raise ValueError("data_types must be provided if by_type is True")
        return v



@router.post("/create_index")
def create_index(
    dataset: Dataset,
    db: Elasticsearch = Depends(get_db)
):
    """Create an index"""

    body = {
        "settings": {
            "number_of_shards": dataset.num_shards,
            "number_of_replicas": dataset.num_replicas
        }
    }

    db.indices.create(index=dataset.index_name, ignore=400)
    index_name = "-".join([x for x in [dataset.index_prefix, dataset.index_name, dataset.index_suffix] if x is not None])
    if dataset.by_type:
        for data_type in dataset.data_types:
            body["mappings"] = get_mappings(data_type)
            db.indices.create(index=f"{index_name}-{data_type}", body=body, ignore=400)
    else:
        body["mappings"] = get_mappings()
        db.indices.create(index=index_name, body=body, ignore=400)
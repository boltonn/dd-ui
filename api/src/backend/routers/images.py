from typing import Annotated

from fastapi import APIRouter, Body, Depends
from elasticsearch import Elasticsearch

from backend.dependencies import get_db
from backend.utils.logging import logger

router = APIRouter(
    prefix="/images",
    tags=["images"],
    responses={404: {"description": "Not found"}},
)

@router.post("/knn")
async def read_images(
    db: Annotated[Elasticsearch, Depends(get_db)],
    datasets: list[str] = Body(..., description="The name of the dataset to search."),
    embedding: list[float] = Body(..., description="The embedding of a query image or piece of text."),
    k: int = Body(12, description="The number of nearest neighbors to return."),
    num_candidates: int = Body(100, description="The number of candidates to retrieve from the index."),
):
    knn = {
        "field": "embedding.image",
        "query_vector": embedding,
        "k": k,
        "num_candidates": num_candidates,
    }

    response = db.search(index=datasets, knn=knn)
    images = [{"id": image["_id"], **image["_source"]} for image in response['hits']['hits']]
    for image in images:
        image['absolute_path'] = image['absolute_path'].replace("/home/boltonn/data/test", "/media")
    return images
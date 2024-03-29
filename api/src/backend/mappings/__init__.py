from loguru import logger

from backend.mappings.base import BASE_MAPPING
from backend.mappings.analyzers import Analyzer
from backend.mappings.parents.file import FILE_PROPERTIES
from backend.mappings.parents.message import MESSAGE_PROPERTIES
from backend.mappings.data.email import EMAIL_PROPERTIES
from backend.mappings.data.image import IMAGE_PROPERTIES
from backend.mappings.data.document import DOCUMENT_PROPERTIES
from backend.mappings.fragments import IMAGE_EMBEDDING_PROPERTIES, TEXT_EMBEDDING_PROPERTIES, TEXT_CHUNKED_EMBEDDING_PROPERTIES
from backend.schemas.enums import DataType


PROPERTIES_MAP = {
    "document": [
        FILE_PROPERTIES,
        DOCUMENT_PROPERTIES,
    ],
    "email": [
        FILE_PROPERTIES,
        EMAIL_PROPERTIES,
        MESSAGE_PROPERTIES,
    ],
    "image": [
        FILE_PROPERTIES,
        IMAGE_PROPERTIES,
    ],
}


def get_mappings(
    data_type: DataType = None,
    analyzer: Analyzer = None,
    has_embeddings: bool = True,
    has_chunked_embeddings: bool = True,
) -> dict:
    """Get the mappings for a given data type"""
    analyzer = analyzer or "standard"
    mappings = BASE_MAPPING.copy()

    if data_type:
        data_type_props = PROPERTIES_MAP[data_type]
        mappings["properties"] |= {k: v for props in data_type_props for k, v in props.items()}           
    else:
        for properties in PROPERTIES_MAP.values():
            for props in properties:
                for key, value in props.items():
                    if key in mappings["properties"]:
                        if "properties" in value:
                            mappings["properties"][key]["properties"].update(value["properties"])
                    else:
                        mappings["properties"][key] = value
    
    if analyzer and "text" in mappings["properties"]:
        mappings["properties"]["text"]["properties"]["source"]["analyzer"] = analyzer

    if has_embeddings:
        mappings["properties"]["embedding"] = {"type": "object", "properties": {}}
        if data_type == DataType.image or data_type is None:
            mappings["properties"]["embedding"]["properties"].update(IMAGE_EMBEDDING_PROPERTIES)
        if data_type == DataType.document or data_type == DataType.email or data_type is None:
            if has_chunked_embeddings:
                mappings["properties"]["embedding"]["properties"].update(TEXT_CHUNKED_EMBEDDING_PROPERTIES)
            else:
                mappings["properties"]["embedding"]["properties"].update(TEXT_EMBEDDING_PROPERTIES)
        
    return mappings
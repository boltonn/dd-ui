from backend.mappings.base import BASE_MAPPING
from backend.mappings.parents.file import FILE_PROPERTIES
from backend.mappings.data.email import EMAIL_PROPERTIES
from backend.mappings.data.image import IMAGE_PROPERTIES
from backend.mappings.data.document import DOCUMENT_PROPERTIES
from backend.schemas.enums import DataType


PROPERTIES_MAP = {
    "document": [
        FILE_PROPERTIES,
        DOCUMENT_PROPERTIES,
    ],
    "email": [
        FILE_PROPERTIES,
        EMAIL_PROPERTIES,
    ],
    "image": [
        FILE_PROPERTIES,
        IMAGE_PROPERTIES,
    ],
}


def get_mappings(data_type: DataType = None) -> dict:
    """Get the mappings for a given data type"""
    mappings = BASE_MAPPING.copy()

    if data_type:
        data_type_props = PROPERTIES_MAP[data_type]
        mappings["properties"] |= {k: v for props in data_type_props for k, v in props.items()}           
    else:
        for properties in PROPERTIES_MAP.values():
            for props in properties:
                for key, value in props.items():
                    if key in mappings["properties"]:
                        mappings["properties"][key].update(value)
                    else:
                        mappings["properties"][key] = value

    return mappings
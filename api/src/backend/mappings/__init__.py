from rogue_backend.mappings.base import BASE_MAPPING
from rogue_backend.mappings.parents.file import FILE_PROPERTIES
from rogue_backend.mappings.data.email import EMAIL_PROPERTIES
from rogue_backend.mappings.image import IMAGE_PROPERTIES
from rogue_backend.mappings.text import TEXT_PROPERTIES
from rogue_backend.schemas.enums.base import DataType


PROPERTIES_MAP = {
    "email": [
        FILE_PROPERTIES,
        EMAIL_PROPERTIES,
        TEXT_PROPERTIES
    ],
    "image": [
        FILE_PROPERTIES,
        IMAGE_PROPERTIES,
        TEXT_PROPERTIES
    ],
}

def get_mappings(data_type: DataType) -> dict:
    """Get the mappings for a given data type"""
    mappings = BASE_MAPPING.copy()
    for properties in PROPERTIES_MAP[data_type]:
        mappings["properties"].update(properties)
    return mappings
from backend.mappings.fragments import HASH_PROPERTIES, REFERENCE_PROPERTIES, TEXT_PROPERTIES

DEFAULT_SETTINGS = {
    "number_of_shards": 1,
    "number_of_replicas": 0
}

BASE_MAPPING = {
    "dynamic": "strict",
    "dynamic_date_formats": ["strict_date_optional_time", "epoch_millis"],
    "properties": {
        "dataset": {
            "type": "keyword"
        },
        "date_ingested": {
            "type": "date",
        },
        "data_type": {
            "type": "keyword"
        },
        **HASH_PROPERTIES,
        "parent_id": {
            "type": "keyword"
        },
        **REFERENCE_PROPERTIES,
        "tags": {
            "type": "keyword"
        },
        **TEXT_PROPERTIES,
        "additional": {
            "type": "object"
        },
    }
}

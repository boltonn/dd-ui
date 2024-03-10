DOCUMENT_PROPERTIES = {
    "created_by": {
        "type": "keyword"
    },
    "embedding": {
        "properties": {
            "text": {
                "type": "dense_vector",
                "dims": 384,
                "similarity": "dot_product"
            },
        }
    },
    "modified_by": {
        "type": "keyword"
    },
    "num_pages": {
        "type": "integer"
    },
    "revision": {
        "type": "integer"
    },
    "subject": {
        "type": "keyword"
    },
    "title": {
        "type": "keyword"
    },
    "version": {
        "type": "keyword"
    }
}
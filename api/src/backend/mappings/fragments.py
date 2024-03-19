HASH_PROPERTIES = {
    "hash": {
        "type": "object",
        "properties": {
            "md5": {
                "type": "keyword"
            },
            "meaningful": {
                "type": "keyword"
            },
            "sha256": {
                "type": "keyword"
            },
            "sha512": {
                "type": "keyword"
            }
        }
    }
}

REFERENCE_PROPERTIES = {
    "references": {
        "type": "object",
        "properties": {
            "name": {
                "type": "keyword",
                "index": False,
            },
            "url": {
                "type": "keyword",
                "index": False,
            },
        }
    }
}

TEXT_PROPERTIES = {
    "text": {
        "properties": {
            "source": {
                "type": "text",
                "analyzer": "standard"
            },
            "translated": {
                "type": "text",
                "analyzer": "standard"
            }
        }
    },
    "languages": {
        "type": "keyword"
    }
}

IMAGE_EMBEDDING_PROPERTIES = {
    "image": {
        "type": "dense_vector",
        "dims": 512,
        "similarity": "dot_product"
    }
}

TEXT_EMBEDDING_PROPERTIES = {
    "text": {
        "type": "dense_vector",
        "dims": 384,
        "similarity": "dot_product"
    }
}

TEXT_CHUNKED_EMBEDDING_PROPERTIES = {
    "text": {
        "type": "nested",
        "properties": {
            "chunk": {
                "type": "dense_vector",
                "dims": 384,
                "similarity": "dot_product"
            }
        }
    }
}
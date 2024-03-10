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
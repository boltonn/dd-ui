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
        "index": False,
        "type": "object",
        "properties": {
            "name": {
                "type": "keyword"
            },
            "url": {
                "type": "keyword"
            },
        }
    }
}

TEXT_PROPERTIES = {
    "text": {
        "properties": {
            "source": {
                "type": "keyword",
                "analyser": "standard"
            },
            "translated": {
                "type": "keyword",
                "analyser": "standard"
            }
        }
    },
    "languages": {
        "type": "keyword"
    }
}
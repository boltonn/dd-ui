IMAGE_PROPERTIES = {
    "embedding": {
        "properties": {
            "image": {
                "type": "dense_vector",
                "dims": 512,
                "similarity": "dot_product"
            },
            "text": {
                "type": "dense_vector",
                "dims": 384,
                "similarity": "dot_product"
            }
        }
    },
    "exif": {
        "type": "object",
    },
    "height": {
        "type": "integer"
    },
    "location": {
        "type": "geo_point"
    },
    "width": {
        "type": "integer"
    },
}
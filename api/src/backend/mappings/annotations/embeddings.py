EMBEDDING_PROPERTIES = {
    "embedding": {
        "properties": {
            "image": {
                "type": "dense_vector",
                "dims": 768,
                "similarity": "dot_product"
            },
            "text": {
                "type": "dense_vector",
                "dims": 768,
                "similarity": "dot_product"
            }
        }
    }
}
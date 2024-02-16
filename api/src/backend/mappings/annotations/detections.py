DETECTION_PROPERTIES = {
    "annotations": {
        "index": False,
        "type": "object",
        "properties": {
            "bounding_box": {
                "type": "object",
                "properties": {
                    "xmin": {
                        "type": "float"
                    },
                    "ymin": {
                        "type": "float"
                    },
                    "xmax": {
                        "type": "float"
                    },
                    "ymax": {
                        "type": "float"
                    }
                }
            },
            "confidence": {
                "type": "float"
            },
            "label": {
                "type": "keyword"
            }
        }
    },
}
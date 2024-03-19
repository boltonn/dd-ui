
EMAIL_PROPERTIES = {
    "has_attachments": {
        "type": "boolean"
    },
    "header": {
        "type": "object",
        "dynamic": True
    },
    "is_archived": {
        "type": "boolean"
    },
    "is_auto_forwarded": {
        "type": "boolean"
    },
    "is_encrypted": {
        "type": "boolean"
    },
    "is_flagged": {
        "type": "boolean"
    },
    "is_forwarded": {
        "type": "boolean"
    },
    "is_read": {
        "type": "boolean"
    },
    "is_signed": {
        "type": "boolean"
    },
    "is_spam": {
        "type": "boolean"
    },
     "subject": {
        "type": "text",
        "analyzer": "standard"
    }
}
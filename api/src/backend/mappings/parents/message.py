MESSAGE_PROPERTIES = {
    "conversation_id": {
        "type": "keyword"
    },
    "date_sent": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
    },
    "direction": {
        "type": "keyword"
    },
    "message_id": {
        "type": "keyword"
    },
    "recipients": {
        "type": "keyword"
    },
    "recipient_groups": {
        "type": "keyword"
    },
    "reply_to_id": {
        "type": "keyword"
    },
    "sender": {
        "type": "keyword"
    },
    "state": {
        "type": "keyword"
    }
}

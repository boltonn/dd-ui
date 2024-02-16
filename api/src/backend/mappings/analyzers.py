# Description: This file contains the analyzers for the elasticsearch index.
ARABIC_PERSIAN_ANALYZER = {
    "analysis": {
        "filter": {
            "arabic_stop": {"type": "stop", "stopwords": "_arabic_"},
            "arabic_stemmer": {"type": "stemmer", "language": "arabic"},
            "persian_stop": {"type": "stop", "stopwords": "_persian_"},
            "persian_stemmer": {"type": "stemmer", "language": "persian"},
        },
        "analyzer": {
            "arabic_persian": {
                "tokenizer": "standard",
                "filter": [
                    "lowercase",
                    "arabic_stop",
                    "arabic_stemmer",
                    "persian_stop",
                    "persian_stemmer",
                ],
            }
        },
    }
}

CJK_ANALYZER = {
    "analysis": {
        "filter": {
            "english_stop": {"type": "stop", "stopwords": "_english_"},
            "english_stemmer": {"type": "stemmer", "language": "english"},
        },
        "analyzer": {
            "cjk": {
                "tokenizer": "standard",
                "filter": [
                    "cjk_width",
                    "lowercase",
                    "cjk_bigram",
                    "english_stop",
                    "english_stemmer",
                ],
            }
        },
    }
}


RUSSIAN_ANALYZER = {
    "analysis": {
        "filter": {
            "english_stop": {"type": "stop", "stopwords": "_english_"},
            "english_stemmer": {"type": "stemmer", "language": "english"},
            # "russian_keywords": {"type": "keyword_marker", "keywords": ["пример"]},
            "russian_stop": {"type": "stop", "stopwords": "_russian_"},
            "russian_stemmer": {"type": "stemmer", "language": "russian"},
        },
        "analyzer": {
            "russian_english": {
                "tokenizer": "standard",
                "filter": [
                    "lowercase",
                    "english_stop",
                    "english_stemmer",
                    "russian_stop",
                    "russian_stemmer",
                    # "russian_keywords",
                ],
            }
        },
    }
}

SPANISH_ANALYZER = {
    "analysis": {
        "filter": {
            "english_stop": {"type": "stop", "stopwords": "_english_"},
            "english_stemmer": {"type": "stemmer", "language": "english"},
            "spanish_stop": {"type": "stop", "stopwords": "_spanish_"},
            "spanish_stemmer": {"type": "stemmer", "language": "spanish"},
        },
        "analyzer": {
            "spanish_english": {
                "tokenizer": "standard",
                "filter": [
                    "lowercase",
                    "english_stop",
                    "english_stemmer",
                    "spanish_stop",
                    "spanish_stemmer",
                ],
            }
        },
    }
}

from enum import StrEnum

class Analyzer(StrEnum):
    arabic_persian = "arabic_persian"
    cjk = "cjk"
    russian_english = "russian_english"
    spanish_english = "spanish_english"
    standard = "standard"


def get_analyzer(analyzer: Analyzer) -> dict:
    if analyzer == Analyzer.arabic_persian:
        return ARABIC_PERSIAN_ANALYZER
    elif analyzer == Analyzer.cjk:
        return CJK_ANALYZER
    elif analyzer == Analyzer.russian_english:
        return RUSSIAN_ANALYZER
    elif analyzer == Analyzer.spanish_english:
        return SPANISH_ANALYZER
    elif analyzer == Analyzer.english or analyzer is None:
        return None
    else:
        raise ValueError(f"Invalid analyzer: {analyzer}")

# Description: This file contains the analyzers for the elasticsearch index.
ARABIC_PERSIAN_ANALYZER = {
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


CJK_ANALYZER = {
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


RUSSIAN_ANALYZER = {
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

SPANISH_ANALYZER = {
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

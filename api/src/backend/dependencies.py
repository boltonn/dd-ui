from functools import lru_cache
from getpass import getpass

from fastapi import HTTPException
from elasticsearch import Elasticsearch

from backend.settings import settings

# TODO: when users, we'll add caching on the client


class DatabaseContextManager:
    def __init__(self):
        try:
            client = Elasticsearch(
                f"https://{settings.elasticsearch.host}:{settings.elasticsearch.port}",
                http_auth=(settings.elasticsearch.username, settings.elasticsearch.password or getpass()),
                use_ssl=settings.elasticsearch.ca_cert is not None,
                ssl_show_warn=False,
                ca_certs=settings.elasticsearch.ca_cert,
                verify_certs=False,
            )
            assert client.ping()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to connect to OpenSearch")
        
        self.db = client

    def __enter__(self):
        return self.db
    
    def __exit__(self, exc_type, exc_value, traceback):
        self.db.close()
        return False

async def get_db():
    with DatabaseContextManager() as db:
        yield db
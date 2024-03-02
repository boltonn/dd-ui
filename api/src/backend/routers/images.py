from typing import Annotated

from fastapi import APIRouter, Depends
from elasticsearch import Elasticsearch

from backend.dependencies import get_db
from backend.utils.logging import logger

router = APIRouter(
    prefix="/images",
    tags=["images"],
    # dependencies=[Security(get_db, use_cache=True)],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_images(db: Annotated[Elasticsearch, Depends(get_db)]):
    return {"Images!": "This is a list of images."}
from fastapi import APIRouter, Depends

from backend.dependencies import get_db

router = APIRouter(
    prefix="/emails",
    tags=["emails"],
    # dependencies=[Depends(get_db, use_cache=True)],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
def read_emails():
    return {"Emails!": "This is a list of emails."}
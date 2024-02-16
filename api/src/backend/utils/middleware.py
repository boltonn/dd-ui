from collections.abc import Callable
from secrets import token_urlsafe
from time import time

from fastapi import Request, Response
from fastapi.responses import PlainTextResponse
from loguru import logger
import orjson

from backend.settings import settings
from backend.utils.exceptions import get_error_response

ORJSON_OPTIONS = orjson.OPT_INDENT_2 | orjson.OPT_NAIVE_UTC | orjson.OPT_SERIALIZE_NUMPY


async def log_middleware(request: Request, call_next: Callable) -> Response:
    """
    Middleware for logging requests and responses
    """
    start_time = time()
    request_id = token_urlsafe(8)
    exception = None

    with logger.contextualize(request_id=request_id):
        data = {
            "request_id": request_id,
            "method": request.method,
            "path": str(request.url)
        }
        try:
            response = await call_next(request)
        except Exception as exc:
            response = PlainTextResponse(
                status_code=500,
                content="Internal Server Error",
            )
            exception = exc
            data |= get_error_response(exc)
        finally:
            elapsed_time = time() - start_time
            data |= {
                "status_code": response.status_code,
                "duration": elapsed_time,
            }
        if response.status_code == 422:
            data["error_type"] = "RequestValidationError"

        if exception or response.status_code >= 400:
            logger.opt(exception=exception).error("Exception", **data) if settings.log_json else logger.opt(exception=exception).error(data)
        else:
            logger.info("Request", **data) if settings.log_json else logger.info(response.status_code)
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Response-Time"] = str(elapsed_time)
        return response
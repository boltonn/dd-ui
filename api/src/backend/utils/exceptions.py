import sys
import traceback

from loguru import logger
import orjson

from fastapi import Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


ORJSON_OPTIONS = orjson.OPT_INDENT_2 | orjson.OPT_NAIVE_UTC | orjson.OPT_SERIALIZE_NUMPY


def get_error_response(exc) -> dict:
    """
    Generic error handling function
    """

    error_response = {"error": True, "message": str(exc), "error_type": exc.__class__.__name__}

    # Add detailed traceback if in debug mode
    exc_trb, exc_type, exc_value = sys.exc_info()

    # Return traceback info if debug mode is on
    error_response["traceback"] = "".join(traceback.format_exception(exc_trb, exc_type, exc_value))

    return error_response


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Handling error in validating requests
    """
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=get_error_response(exc),
    )


async def python_exception_handler(request: Request, exc: Exception):
    """
    Handling any internal error
    """
    logger.error(
        orjson.dumps(
            {
                "host": request.client.host,
                "method": request.method,
                "url": str(request.url),
                "headers": str(request.headers),
                "path_params": str(request.path_params),
                "query_params": str(request.query_params),
                "cookies": str(request.cookies),
            },
            default=str,
            option=ORJSON_OPTIONS,
        )
    )

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=get_error_response(exc),
    )

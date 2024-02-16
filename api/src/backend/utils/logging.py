import logging
import os
from pathlib import Path
from sys import stdout

from loguru import logger
import orjson
from pygments import highlight
from pygments.formatters.terminal256 import Terminal256Formatter
from pygments.lexers.data import JsonLexer

from backend.settings import settings


PYGMENTS_STYLE = os.getenv("PYGMENTS_STYLE", "github-dark")
DEFAULT_LOG_FORMAT = (
    "<level>{level: <8}</level> "
    "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> - "
    "<cyan>{name}</cyan>:<cyan>{function}</cyan> - "
    "<level>{message}</level>"
)
ORJSON_OPTIONS = orjson.OPT_INDENT_2 | orjson.OPT_NAIVE_UTC | orjson.OPT_SERIALIZE_NUMPY

lexer = JsonLexer()
formatter = Terminal256Formatter(style=PYGMENTS_STYLE)

def serialize(record: dict) -> str:
    """
    Serialize log record to JSON
    """
    subset = {
        "timestamp": record["time"].isoformat(),
        "level": record["level"].name,
        "message": record["message"],
        "source": f"{record['name']}:{record['function']}:L{record['line']}",
    }
    subset.update(record["extra"])
    formatted_json = orjson.dumps(subset, default=str, option=ORJSON_OPTIONS).decode()
    return highlight(formatted_json, lexer, formatter)

class InterceptHandler(logging.Handler):
    def emit(self, record):
        # Get corresponding Loguru level if it exists
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the logged message
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(level, record.getMessage())


def make_logger(
    file_path: Path = None, 
    level: str = "INFO", 
    rotation: str = "1 day",
    retention: str = "1 week", 
    format: str = DEFAULT_LOG_FORMAT
):
    logger.remove(0)

    logger.add(
        lambda msg: print(serialize(msg.record)),
        colorize=True,
        format=format,
        backtrace=True,
        level=level.upper(),
        enqueue=True,
        serialize=False,
    )

    if file_path is not None:
        logger.add(
            str(file_path), 
            rotation=rotation, 
            retention=retention, 
            enqueue=True, 
            backtrace=True, 
            level=level.upper(), 
            format=format
        )

    intercept_handler = InterceptHandler()
    for name in (
        "uvicorn",
        "uvicorn.error",
        "fastapi",
        "gunicorn",
        "gunicorn.access",
        "gunicorn.error",
    ):
        logging_logger = logging.getLogger(name)
        logging_logger.handlers = [intercept_handler]
        logging_logger.propagate = False

    logger.configure(
        handlers=[{
            "sink": lambda msg: print(serialize(msg.record)), 
            "level": level.upper(), 
            "enqueue": True, 
            "serialize": False, 
            "format": format
        }]
    )

    

    return logger


if settings.log_json:
    logger = make_logger(  # noqa F811
        file_path=settings.log_file,
        level=settings.log_level,
    )

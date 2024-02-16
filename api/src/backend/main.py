from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware
import uvicorn

from backend.settings import settings
from backend.utils.health import ServiceHealthStatus, service_health
from backend.utils.info import ServiceInfo, service_info
from backend.utils.exceptions import python_exception_handler, validation_exception_handler
from backend.utils.logging import logger
from backend.utils.middleware import log_middleware


state = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    service_health.status = ServiceHealthStatus.OK
    yield
    state.clear()


app = FastAPI(
    title="Data Distillery API",
    version=service_info.version,
    description=service_info.description,
    lifespan=lifespan,
    root_path="/api",
)
app.add_middleware(BaseHTTPMiddleware, dispatch=log_middleware)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, python_exception_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
static_path = Path(__file__).parent/"assets"
app.mount(f"/{static_path.name}", StaticFiles(directory=static_path), name="static")
def swagger_redirect(*args, **kwargs):
    return get_swagger_ui_html(
        *args,
        **kwargs,
        swagger_favicon_url=f"/{static_path.name}/logo.png",
        swagger_js_url=f"/{static_path.name}/swagger-ui-bundle.js",
        swagger_css_url=f"/{static_path.name}/swagger-ui.css",
    )
app.get_swagger_ui_html = swagger_redirect

@app.get('/logo.png', include_in_schema=False)
async def favicon():
    return FileResponse(str(static_path / "logo.png"))

@app.get("/health")
async def health() -> ServiceHealthStatus:
    return service_health.status

@app.get("/info")
async def info() -> ServiceInfo:
    return service_info

@app.get("/helloWorld")
async def hello_world() -> str:
    return "Hello, World!"

def main():
    kwargs = {"log_config": None} if settings.log_json else {}
    uvicorn.run(
        "backend.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
        **kwargs,
    )

if __name__ == "__main__":
    main()
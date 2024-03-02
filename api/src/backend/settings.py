from pathlib import Path
from typing import Optional

from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class ElasticsearchConfig(BaseModel):
    host: str = Field(
        "localhost",
        description="Elasticsearch host for attaching to the logical cluster",
    )
    port: int = Field(9200, description="Elasticsearch port")
    ca_cert: Path = Field(
        None,
        description="Elasticsearch CA certificate",
    )
    username: str = Field(..., description="Elasticsearch username")
    password: str = Field(
        ...,
        description="Elasticsearch password",
    )


class Settings(BaseSettings):
    host: str = Field("0.0.0.0", validation_alias="HOST", description="Host to bind to")
    port: int = Field(8000, validation_alias="PORT", description="Port to bind to")
    reload: Optional[bool] = Field(True, description="Reload mode")
    log_file: Optional[str] = Field(None, description="File to write logs to if desired")
    log_level: Optional[str] = Field("INFO", validation_alias="LOG_LEVEL", description="Log level")
    log_json: Optional[bool] = Field(True, description="Log in JSON format")
    elasticsearch: Optional[ElasticsearchConfig] = Field(None, description="Elasticsearch configuration object")
    model_config = SettingsConfigDict(env_file=".env", env_nested_delimiter="__")


settings = Settings()
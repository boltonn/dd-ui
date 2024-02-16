from typing import Optional

from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class ElasticsearchConfig(BaseModel):
    host: str = Field(
        "0.0.0.0",
        validation_alias="ELASTICSEARCH__HOST",
        description="Elasticsearch host for attaching to the logical cluster",
    )
    port: int = Field(9200, validation_alias="ELASTICSEARCH__PORT", description="Elasticsearch port")
    crt: str = Field(
        None,
        validation_alias="ELASTICSEARCH__CA_CERT",
        description="Elasticsearch CA certificate",
    )
    user: str = Field("elastic", validation_alias="ELASTICSEARCH_USERNAME", description="Elasticsearch username")
    pwd: str = Field(
        "elastic",
        validation_alias="ELASTICSEARCH__PASSWORD",
        description="Elasticsearch password",
    )




class Settings(BaseSettings):
    host: str = Field("0.0.0.0", validation_alias="HOST", description="Host to bind to")
    port: int = Field(8000, validation_alias="PORT", description="Port to bind to")
    reload: Optional[bool] = Field(True, description="Reload mode")
    log_file: Optional[str] = Field(None, description="File to write logs to if desired")
    log_level: Optional[str] = Field("INFO", validation_alias="LOG_LEVEL", description="Log level")
    log_json: Optional[bool] = Field(True, description="Log in JSON format")
    es_config: Optional[ElasticsearchConfig] = Field(None, description="Elasticsearch configuration object")
    model_config = SettingsConfigDict(env_file=".env", env_nested_delimiter="__")


settings = Settings()

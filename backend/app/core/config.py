from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "ResumeIQ API"
    app_version: str = "1.0.0"
    environment: str = "development"
    api_prefix: str = "/api"

    database_url: str = "sqlite:///./resumeiq.db"

    allowed_origins: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


settings = Settings()
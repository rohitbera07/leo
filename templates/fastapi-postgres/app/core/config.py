from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    app_env: str = 'development'
    port: int = 8000
    database_url: str = 'postgresql+psycopg://postgres:postgres@127.0.0.1:5432/{{name}}'
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')
settings = Settings()

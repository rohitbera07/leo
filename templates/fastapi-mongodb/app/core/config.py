from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    app_env: str = 'development'; port: int = 8000
    mongodb_uri: str = 'mongodb://127.0.0.1:27017'; mongodb_db: str = '{{name}}'
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')
settings = Settings()

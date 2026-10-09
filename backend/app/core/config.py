from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Biliardino San Paolo API"
    DATABASE_URL: str = "postgresql://user_biliardino:password_biliardino@db:5432/biliardino_db"

    class Config:
        env_file = ".env"

settings = Settings()

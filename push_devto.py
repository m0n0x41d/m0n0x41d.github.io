import httpx
from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DEV_TO_API_URL: str = "https://dev.to/api/"
    model_config = SettingsConfigDict(env_file=".env")
    DEV_TO_API_TOKEN: str


settings = Settings()  # type: ignore

DEV_TO_HEADERS = {
    "api-key": settings.DEV_TO_API_TOKEN,
    "Content-Type": "application/json",
    "Accept": "application/vnd.forem.api-v1+json",
}


class DevToPostArticle(BaseModel):
    title: str
    body_markdown: str
    published: bool = False
    series: str | None = None
    main_image: str | None = None
    canonical_url: str | None = None
    description: str | None = None
    tags: str | None = None
    organization_id: int | None = None


def get_dev_to_articles() -> str:
    response = httpx.get(
        f"{settings.DEV_TO_API_URL}/articles/me", headers=DEV_TO_HEADERS
    )
    return response.json()


def post_dev_to_article(article: DevToPostArticle) -> str:
    payload = {"article": article.model_dump(exclude_none=True)}
    response = httpx.post(
        f"{settings.DEV_TO_API_URL}/articles",
        headers=DEV_TO_HEADERS,
        json=payload,
    )
    return response.json()


print(get_dev_to_articles())

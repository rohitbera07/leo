"""FastAPI application entry point for the semantic RAG project."""

from fastapi import FastAPI

from app.api.routes.health import router as health_router

app = FastAPI(title="Semantic RAG API")
app.include_router(health_router)

from fastapi import FastAPI
from app.api.routes.health import router as health_router
from app.api.routes.examples import router as examples_router
app = FastAPI(title='{{name}}')
app.include_router(health_router)
app.include_router(examples_router)

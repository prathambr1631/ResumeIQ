from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.analysis import router as analysis_router
from backend.app.api.database_test import router as database_router
from backend.app.core.config import settings
from backend.app.core.database import Base, engine
from backend.app.models.analysis import Analysis


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title=settings.app_name,
    description="AI-powered resume analysis and job matching API",
    version=settings.app_version,
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in settings.allowed_origins.split(",")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    database_router,
    prefix=settings.api_prefix,
)

app.include_router(
    analysis_router,
    prefix=settings.api_prefix,
)


@app.get("/")
def root():
    return {
        "message": "ResumeIQ API is running",
        "status": "success",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.app_name,
        "environment": settings.environment,
    }
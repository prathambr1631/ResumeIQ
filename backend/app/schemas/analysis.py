from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class AnalysisCreate(BaseModel):
    resume_name: str = Field(
        min_length=1,
        max_length=255,
    )

    job_title: str = Field(
        min_length=1,
        max_length=255,
    )

    match_score: float = Field(
        ge=0,
        le=100,
    )

    matched_skills: list[str] = Field(
        default_factory=list,
    )

    missing_skills: list[str] = Field(
        default_factory=list,
    )


class AnalysisResponse(BaseModel):
    id: int
    resume_name: str
    job_title: str
    match_score: float
    matched_skills: list[str]
    missing_skills: list[str]
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )
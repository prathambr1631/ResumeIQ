from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from backend.app.services.hybrid_matcher import HybridMatcher
from backend.app.services.recommendation_engine import (
    RecommendationEngine,
)
from backend.app.services.skill_extractor import SkillExtractor


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"],
)


class JobMatchRequest(BaseModel):
    resume_text: str = Field(
        min_length=20,
    )

    resume_skills: list[str] = Field(
        default_factory=list,
    )

    job_description: str = Field(
        min_length=20,
        max_length=10000,
    )


@router.post("/match")
def match_job(
    request: JobMatchRequest,
):
    try:
        skill_extractor = SkillExtractor()
        hybrid_matcher = HybridMatcher()
        recommendation_engine = RecommendationEngine()

        job_skills = skill_extractor.get_flat_skills(
            request.job_description
        )

        match_result = hybrid_matcher.calculate_match(
            resume_text=request.resume_text,
            resume_skills=request.resume_skills,
            job_description=request.job_description,
            job_skills=job_skills,
        )

        recommendations = (
            recommendation_engine.generate(
                missing_skills=match_result[
                    "missing_skills"
                ],
                semantic_score=match_result[
                    "semantic_score"
                ],
            )
        )

        return {
            "job_skills": job_skills,
            **match_result,
            "recommendations": recommendations,
        }

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "An unexpected error occurred "
                "while matching the job."
            ),
        ) from exc
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from backend.app.services.job_matcher import JobMatcher
from backend.app.services.skill_extractor import SkillExtractor


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"],
)


class JobMatchRequest(BaseModel):
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
        job_matcher = JobMatcher()

        job_skills = skill_extractor.get_flat_skills(
            request.job_description
        )

        result = job_matcher.calculate_match(
            resume_skills=request.resume_skills,
            job_skills=job_skills,
        )

        return {
            "job_skills": job_skills,
            **result,
        }

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while matching the job.",
        ) from exc
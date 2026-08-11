from sqlalchemy.orm import Session

from backend.app.repositories.analysis_repository import AnalysisRepository
from backend.app.schemas.analysis import AnalysisCreate, AnalysisResponse


class AnalysisService:
    def __init__(self, db: Session):
        self.repository = AnalysisRepository(db)

    def create_analysis(
        self,
        analysis_data: AnalysisCreate,
    ) -> AnalysisResponse:
        matched_skills = ", ".join(analysis_data.matched_skills)
        missing_skills = ", ".join(analysis_data.missing_skills)

        analysis = self.repository.create(
            resume_name=analysis_data.resume_name,
            job_title=analysis_data.job_title,
            match_score=analysis_data.match_score,
            matched_skills=matched_skills,
            missing_skills=missing_skills,
        )

        return self._to_response(analysis)

    def get_analysis(
        self,
        analysis_id: int,
    ) -> AnalysisResponse | None:
        analysis = self.repository.get_by_id(analysis_id)

        if analysis is None:
            return None

        return self._to_response(analysis)

    def get_all_analyses(self) -> list[AnalysisResponse]:
        analyses = self.repository.get_all()

        return [
            self._to_response(analysis)
            for analysis in analyses
        ]

    def delete_analysis(self, analysis_id: int) -> bool:
        return self.repository.delete(analysis_id)

    @staticmethod
    def _to_response(analysis) -> AnalysisResponse:
        matched_skills = (
            [
                skill.strip()
                for skill in analysis.matched_skills.split(",")
                if skill.strip()
            ]
            if analysis.matched_skills
            else []
        )

        missing_skills = (
            [
                skill.strip()
                for skill in analysis.missing_skills.split(",")
                if skill.strip()
            ]
            if analysis.missing_skills
            else []
        )

        return AnalysisResponse(
            id=analysis.id,
            resume_name=analysis.resume_name,
            job_title=analysis.job_title,
            match_score=analysis.match_score,
            matched_skills=matched_skills,
            missing_skills=missing_skills,
            created_at=analysis.created_at,
        )
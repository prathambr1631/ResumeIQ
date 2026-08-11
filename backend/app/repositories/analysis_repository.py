from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.models.analysis import Analysis


class AnalysisRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        resume_name: str,
        job_title: str,
        match_score: float,
        matched_skills: str,
        missing_skills: str,
    ) -> Analysis:
        analysis = Analysis(
            resume_name=resume_name,
            job_title=job_title,
            match_score=match_score,
            matched_skills=matched_skills,
            missing_skills=missing_skills,
        )

        self.db.add(analysis)
        self.db.commit()
        self.db.refresh(analysis)

        return analysis

    def get_by_id(self, analysis_id: int) -> Analysis | None:
        statement = select(Analysis).where(
            Analysis.id == analysis_id
        )

        return self.db.scalar(statement)

    def get_all(self) -> list[Analysis]:
        statement = select(Analysis).order_by(
            Analysis.created_at.desc()
        )

        return list(self.db.scalars(statement).all())

    def delete(self, analysis_id: int) -> bool:
        analysis = self.get_by_id(analysis_id)

        if analysis is None:
            return False

        self.db.delete(analysis)
        self.db.commit()

        return True
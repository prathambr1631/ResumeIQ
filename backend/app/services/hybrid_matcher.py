from backend.app.services.job_matcher import JobMatcher
from backend.app.services.semantic_matcher import SemanticMatcher


class HybridMatcher:
    SKILL_WEIGHT = 0.40
    SEMANTIC_WEIGHT = 0.60

    def __init__(self):
        self.skill_matcher = JobMatcher()
        self.semantic_matcher = SemanticMatcher()

    def calculate_match(
        self,
        resume_text: str,
        resume_skills: list[str],
        job_description: str,
        job_skills: list[str],
    ) -> dict:
        skill_result = self.skill_matcher.calculate_match(
            resume_skills=resume_skills,
            job_skills=job_skills,
        )

        semantic_result = (
            self.semantic_matcher.calculate_similarity(
                resume_text=resume_text,
                job_description=job_description,
            )
        )

        skill_score = skill_result["match_score"]
        semantic_score = semantic_result[
            "semantic_score"
        ]

        hybrid_score = round(
            (
                skill_score * self.SKILL_WEIGHT
                + semantic_score * self.SEMANTIC_WEIGHT
            )
        )

        return {
            "match_score": hybrid_score,
            "skill_match_score": skill_score,
            "semantic_score": semantic_score,
            "matched_skills": skill_result[
                "matched_skills"
            ],
            "missing_skills": skill_result[
                "missing_skills"
            ],
            "model": semantic_result["model"],
        }
class JobMatcher:
    def calculate_match(
        self,
        resume_skills: list[str],
        job_skills: list[str],
    ) -> dict:
        resume_skill_set = {
            self._normalize(skill)
            for skill in resume_skills
        }

        job_skill_set = {
            self._normalize(skill)
            for skill in job_skills
        }

        if not job_skill_set:
            return {
                "match_score": 0,
                "matched_skills": [],
                "missing_skills": [],
            }

        matched_skills = [
            skill
            for skill in job_skills
            if self._normalize(skill) in resume_skill_set
        ]

        missing_skills = [
            skill
            for skill in job_skills
            if self._normalize(skill) not in resume_skill_set
        ]

        match_score = round(
            (
                len(matched_skills)
                / len(job_skill_set)
            )
            * 100
        )

        return {
            "match_score": match_score,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
        }

    @staticmethod
    def _normalize(skill: str) -> str:
        return (
            skill.lower()
            .strip()
            .replace("-", " ")
        )
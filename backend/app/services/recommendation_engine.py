from typing import Any


class RecommendationEngine:
    """
    Generates actionable recommendations based on
    skills missing from a target job description.
    """

    SKILL_CATEGORIES = {
        "python": "Programming",
        "java": "Programming",
        "javascript": "Programming",
        "typescript": "Programming",
        "c": "Programming",
        "c++": "Programming",

        "numpy": "Data Science",
        "pandas": "Data Science",
        "matplotlib": "Data Science",
        "seaborn": "Data Science",

        "machine learning": "Machine Learning",
        "scikit-learn": "Machine Learning",
        "tensorflow": "Machine Learning",
        "pytorch": "Machine Learning",
        "deep learning": "Machine Learning",
        "nlp": "AI / NLP",

        "sql": "Databases",
        "mongodb": "Databases",
        "postgresql": "Databases",
        "mysql": "Databases",

        "fastapi": "Backend",
        "flask": "Backend",
        "django": "Backend",
        "rest api": "Backend",

        "git": "Development Tools",
        "docker": "DevOps",
        "kubernetes": "DevOps",

        "aws": "Cloud",
        "azure": "Cloud",
        "gcp": "Cloud",
    }

    PRIORITY_SKILLS = {
        "python",
        "machine learning",
        "scikit-learn",
        "pytorch",
        "tensorflow",
        "sql",
        "docker",
        "aws",
    }

    SKILL_DETAILS = {
        "python": {
            "why": (
                "Python is a core requirement for many "
                "AI, ML and backend roles."
            ),
            "action": (
                "Build or improve a Python project that "
                "demonstrates practical problem solving."
            ),
            "impact": "High",
        },
        "machine learning": {
            "why": (
                "The target role requires machine learning "
                "knowledge that was not detected in your resume."
            ),
            "action": (
                "Build an end-to-end ML project covering "
                "data preprocessing, training and evaluation."
            ),
            "impact": "High",
        },
        "scikit-learn": {
            "why": (
                "Scikit-learn is commonly used for practical "
                "classical machine learning workflows."
            ),
            "action": (
                "Create an ML project using preprocessing, "
                "model training and evaluation with Scikit-learn."
            ),
            "impact": "High",
        },
        "numpy": {
            "why": (
                "NumPy is a fundamental library for numerical "
                "computing and many Python ML workflows."
            ),
            "action": (
                "Practice array operations, numerical computation "
                "and data manipulation with NumPy."
            ),
            "impact": "Medium",
        },
        "pandas": {
            "why": (
                "Pandas is widely used for data cleaning, "
                "transformation and exploratory analysis."
            ),
            "action": (
                "Work with a real dataset and demonstrate "
                "cleaning, transformation and analysis."
            ),
            "impact": "Medium",
        },
        "sql": {
            "why": (
                "SQL is important for retrieving and working "
                "with structured application data."
            ),
            "action": (
                "Practice joins, aggregation, subqueries and "
                "database querying using a small project."
            ),
            "impact": "High",
        },
        "docker": {
            "why": (
                "Docker demonstrates that you can package and "
                "run applications consistently across environments."
            ),
            "action": (
                "Dockerize one of your existing projects and "
                "document how to build and run it."
            ),
            "impact": "High",
        },
        "aws": {
            "why": (
                "Cloud experience can be important for deploying "
                "and operating production applications."
            ),
            "action": (
                "Deploy a small application or ML API using "
                "an AWS service and document the deployment."
            ),
            "impact": "High",
        },
        "tensorflow": {
            "why": (
                "TensorFlow is a major deep learning framework "
                "used in production and research."
            ),
            "action": (
                "Build a small neural-network project using "
                "TensorFlow and evaluate its performance."
            ),
            "impact": "High",
        },
        "pytorch": {
            "why": (
                "PyTorch is widely used for deep learning and "
                "modern AI development."
            ),
            "action": (
                "Build a small deep learning project using "
                "PyTorch and document the training process."
            ),
            "impact": "High",
        },
        "fastapi": {
            "why": (
                "FastAPI is useful for exposing ML models "
                "and Python services through APIs."
            ),
            "action": (
                "Create a small REST API and expose an ML "
                "model through FastAPI."
            ),
            "impact": "Medium",
        },
        "git": {
            "why": (
                "Git is an essential development workflow "
                "tool for collaborative software projects."
            ),
            "action": (
                "Maintain your projects with meaningful commits "
                "and a clean GitHub repository."
            ),
            "impact": "Medium",
        },
        "kubernetes": {
            "why": (
                "Kubernetes is used to orchestrate containerized "
                "applications at scale."
            ),
            "action": (
                "Learn core Kubernetes concepts and deploy "
                "a small containerized application."
            ),
            "impact": "Medium",
        },
    }

    def generate(
        self,
        missing_skills: list[str],
        semantic_score: int,
    ) -> list[dict[str, Any]]:
        recommendations = []

        for skill in missing_skills:
            normalized_skill = skill.strip().lower()

            category = self.SKILL_CATEGORIES.get(
                normalized_skill,
                "General",
            )

            priority = self._get_priority(
                normalized_skill,
                semantic_score,
            )

            details = self.SKILL_DETAILS.get(
                normalized_skill,
                self._default_details(skill),
            )

            recommendations.append(
                {
                    "skill": skill,
                    "category": category,
                    "priority": priority,
                    "why_flagged": details["why"],
                    "suggested_action": details["action"],
                    "resume_impact": details["impact"],
                }
            )

        recommendations.sort(
            key=lambda item: self._priority_rank(
                item["priority"]
            )
        )

        return recommendations

    def _get_priority(
        self,
        skill: str,
        semantic_score: int,
    ) -> str:
        if skill in self.PRIORITY_SKILLS:
            return "High"

        if semantic_score < 50:
            return "High"

        return "Medium"

    def _priority_rank(
        self,
        priority: str,
    ) -> int:
        ranking = {
            "High": 0,
            "Medium": 1,
            "Low": 2,
        }

        return ranking.get(priority, 3)

    def _default_details(
        self,
        skill: str,
    ) -> dict[str, str]:
        return {
            "why": (
                f"{skill} appears in the target job "
                "requirements but was not detected in "
                "your resume."
            ),
            "action": (
                f"Learn the fundamentals of {skill} and "
                "apply them in a practical project."
            ),
            "impact": "Medium",
        }
import json
import re
from pathlib import Path


class SkillExtractor:
    def __init__(self):
        skills_path = (
            Path(__file__).resolve().parent.parent
            / "data"
            / "skills.json"
        )

        with skills_path.open(
            "r",
            encoding="utf-8",
        ) as file:
            self.skill_database = json.load(file)

        self._normalized_skills = self._build_normalized_skills()

    def extract(
        self,
        text: str,
    ) -> dict[str, list[str]]:
        normalized_text = self._normalize_text(text)

        detected_skills = {}

        for category, skills in self._normalized_skills.items():
            matches = []

            for normalized_skill, original_skill in skills.items():
                if self._skill_exists(
                    normalized_text,
                    normalized_skill,
                ):
                    matches.append(original_skill)

            if matches:
                detected_skills[category] = sorted(
                    matches,
                    key=str.lower,
                )

        return detected_skills

    def get_flat_skills(
        self,
        text: str,
    ) -> list[str]:
        categorized_skills = self.extract(text)

        return sorted(
            {
                skill
                for skills in categorized_skills.values()
                for skill in skills
            },
            key=str.lower,
        )

    def _build_normalized_skills(self):
        normalized = {}

        for category, skills in self.skill_database.items():
            normalized[category] = {}

            for skill in skills:
                normalized_skill = self._normalize_text(skill)

                normalized[category][
                    normalized_skill
                ] = skill

        return normalized

    @staticmethod
    def _normalize_text(text: str) -> str:
        text = text.lower()

        text = text.replace(
            "-",
            " ",
        )

        text = re.sub(
            r"[^a-z0-9+#.\s]",
            " ",
            text,
        )

        text = re.sub(
            r"\s+",
            " ",
            text,
        )

        return text.strip()

    @staticmethod
    def _skill_exists(
        text: str,
        skill: str,
    ) -> bool:
        pattern = rf"(?<!\w){re.escape(skill)}(?!\w)"

        return re.search(
            pattern,
            text,
        ) is not None
class ResumeQualityAnalyzer:
    EXPECTED_SECTIONS = {
        "summary": 10,
        "experience": 25,
        "education": 20,
        "skills": 15,
        "projects": 15,
        "certifications": 5,
        "achievements": 5,
        "languages": 5,
    }

    def analyze(
        self,
        text: str,
        skills: dict[str, list[str]],
        sections: dict[str, str],
    ) -> dict:
        section_score = self._calculate_section_score(
            sections
        )

        skills_score = self._calculate_skills_score(
            skills
        )

        content_score = self._calculate_content_score(
            text
        )

        structure_score = self._calculate_structure_score(
            text
        )

        overall_score = round(
            (
                section_score * 0.35
                + skills_score * 0.25
                + content_score * 0.25
                + structure_score * 0.15
            )
        )

        return {
            "overall_score": overall_score,
            "section_score": section_score,
            "skills_score": skills_score,
            "content_score": content_score,
            "structure_score": structure_score,
        }

    def _calculate_section_score(
        self,
        sections: dict[str, str],
    ) -> int:
        if not sections:
            return 0

        available_weight = sum(
            weight
            for section, weight in self.EXPECTED_SECTIONS.items()
            if section in sections
        )

        total_weight = sum(
            self.EXPECTED_SECTIONS.values()
        )

        return round(
            (available_weight / total_weight) * 100
        )

    @staticmethod
    def _calculate_skills_score(
        skills: dict[str, list[str]],
    ) -> int:
        detected_skill_count = sum(
            len(skill_list)
            for skill_list in skills.values()
        )

        if detected_skill_count == 0:
            return 0

        if detected_skill_count >= 15:
            return 100

        return min(
            100,
            round(
                (detected_skill_count / 15) * 100
            ),
        )

    @staticmethod
    def _calculate_content_score(
        text: str,
    ) -> int:
        words = text.split()
        word_count = len(words)

        if word_count < 100:
            return 30

        if word_count < 200:
            return 50

        if word_count < 350:
            return 70

        if word_count < 500:
            return 85

        return 100

    @staticmethod
    def _calculate_structure_score(
        text: str,
    ) -> int:
        lines = [
            line.strip()
            for line in text.splitlines()
            if line.strip()
        ]

        if not lines:
            return 0

        short_lines = sum(
            1
            for line in lines
            if len(line.split()) <= 12
        )

        ratio = short_lines / len(lines)

        if ratio >= 0.7:
            return 100

        if ratio >= 0.5:
            return 85

        if ratio >= 0.3:
            return 70

        return 55
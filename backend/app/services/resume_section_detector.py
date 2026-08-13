import re


class ResumeSectionDetector:
    SECTION_PATTERNS = {
        "summary": [
            "summary",
            "professional summary",
            "profile",
            "career objective",
            "objective",
        ],
        "experience": [
            "experience",
            "work experience",
            "professional experience",
            "employment",
            "work history",
        ],
        "education": [
            "education",
            "academic background",
            "academic qualifications",
        ],
        "skills": [
            "skills",
            "technical skills",
            "core skills",
            "technical expertise",
            "technologies",
        ],
        "projects": [
            "projects",
            "personal projects",
            "academic projects",
            "project experience",
        ],
        "certifications": [
            "certifications",
            "certificates",
            "licenses & certifications",
        ],
        "achievements": [
            "achievements",
            "accomplishments",
            "awards",
            "honors",
        ],
        "languages": [
            "languages",
            "language proficiency",
        ],
    }

    def detect(self, text: str) -> dict[str, str]:
        lines = self._clean_lines(text)

        sections = {}
        current_section = None
        current_content = []

        for line in lines:
            detected_section = self._detect_section_heading(line)

            if detected_section:
                if current_section:
                    sections[current_section] = "\n".join(
                        current_content
                    ).strip()

                current_section = detected_section
                current_content = []
                continue

            if current_section:
                current_content.append(line)

        if current_section:
            sections[current_section] = "\n".join(
                current_content
            ).strip()

        return {
            section: content
            for section, content in sections.items()
            if content
        }

    def get_available_sections(
        self,
        text: str,
    ) -> list[str]:
        sections = self.detect(text)

        return list(sections.keys())

    def _detect_section_heading(
        self,
        line: str,
    ) -> str | None:
        normalized_line = self._normalize_line(line)

        for section, patterns in self.SECTION_PATTERNS.items():
            for pattern in patterns:
                if normalized_line == self._normalize_line(pattern):
                    return section

        return None

    @staticmethod
    def _clean_lines(text: str) -> list[str]:
        return [
            line.strip()
            for line in text.splitlines()
            if line.strip()
        ]

    @staticmethod
    def _normalize_line(line: str) -> str:
        line = line.lower()

        line = re.sub(
            r"[^a-z0-9&\s]",
            " ",
            line,
        )

        line = re.sub(
            r"\s+",
            " ",
            line,
        )

        return line.strip()
from pathlib import Path

import fitz
from fastapi import UploadFile

from backend.app.services.resume_quality_analyzer import (
    ResumeQualityAnalyzer,
)
from backend.app.services.resume_section_detector import (
    ResumeSectionDetector,
)
from backend.app.services.skill_extractor import SkillExtractor


class ResumeService:
    ALLOWED_EXTENSIONS = {".pdf"}
    MAX_FILE_SIZE = 5 * 1024 * 1024

    def __init__(self):
        self.skill_extractor = SkillExtractor()
        self.section_detector = ResumeSectionDetector()
        self.quality_analyzer = ResumeQualityAnalyzer()

    async def process_resume(
        self,
        file: UploadFile,
    ) -> dict:
        self._validate_file_extension(file)

        file_content = await file.read()

        self._validate_file_size(file_content)

        extracted_text = self._extract_pdf_text(file_content)

        skills = self.skill_extractor.extract(
            extracted_text
        )

        sections = self.section_detector.detect(
            extracted_text
        )

        quality = self.quality_analyzer.analyze(
            text=extracted_text,
            skills=skills,
            sections=sections,
        )

        return {
            "filename": file.filename,
            "character_count": len(extracted_text),
            "text": extracted_text,
            "skills": skills,
            "sections": sections,
            "quality": quality,
        }

    @classmethod
    def _validate_file_extension(
        cls,
        file: UploadFile,
    ) -> None:
        filename = file.filename or ""
        extension = Path(filename).suffix.lower()

        if extension not in cls.ALLOWED_EXTENSIONS:
            raise ValueError(
                "Only PDF files are supported."
            )

    @classmethod
    def _validate_file_size(
        cls,
        file_content: bytes,
    ) -> None:
        if len(file_content) > cls.MAX_FILE_SIZE:
            raise ValueError(
                "The PDF file must be smaller than 5 MB."
            )

    @staticmethod
    def _extract_pdf_text(
        file_content: bytes,
    ) -> str:
        try:
            document = fitz.open(
                stream=file_content,
                filetype="pdf",
            )
        except Exception as exc:
            raise ValueError(
                "The uploaded file is not a valid PDF."
            ) from exc

        try:
            extracted_text = "\n".join(
                page.get_text()
                for page in document
            )
        finally:
            document.close()

        extracted_text = extracted_text.strip()

        if not extracted_text:
            raise ValueError(
                "No readable text could be extracted from the PDF."
            )

        return extracted_text
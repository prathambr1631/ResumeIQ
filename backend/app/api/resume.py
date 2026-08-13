from fastapi import APIRouter, File, HTTPException, UploadFile, status

from backend.app.services.resume_service import ResumeService


router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"],
)


@router.post("/extract")
async def extract_resume_text(
    file: UploadFile = File(...),
):
    try:
        service = ResumeService()

        return await service.process_resume(file)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while processing the resume.",
        ) from exc
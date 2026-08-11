from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.core.database import get_db
from backend.app.schemas.analysis import AnalysisCreate, AnalysisResponse
from backend.app.services.analysis_service import AnalysisService


router = APIRouter(
    prefix="/analyses",
    tags=["Analyses"],
)


@router.post(
    "",
    response_model=AnalysisResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_analysis(
    analysis_data: AnalysisCreate,
    db: Session = Depends(get_db),
):
    service = AnalysisService(db)

    return service.create_analysis(analysis_data)


@router.get(
    "",
    response_model=list[AnalysisResponse],
)
def get_analyses(
    db: Session = Depends(get_db),
):
    service = AnalysisService(db)

    return service.get_all_analyses()


@router.get(
    "/{analysis_id}",
    response_model=AnalysisResponse,
)
def get_analysis(
    analysis_id: int,
    db: Session = Depends(get_db),
):
    service = AnalysisService(db)

    analysis = service.get_analysis(analysis_id)

    if analysis is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )

    return analysis


@router.delete(
    "/{analysis_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_analysis(
    analysis_id: int,
    db: Session = Depends(get_db),
):
    service = AnalysisService(db)

    deleted = service.delete_analysis(analysis_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found",
        )
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .schemas import Projeto, ProjetoCreate
from .database import get_db
from .services import create_projeto

router = APIRouter()


@router.post("/", response_model=Projeto)
def create_project(projeto: ProjetoCreate, db: Session = Depends(get_db)):

    if projeto.status != '1' or '2':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be 1 (Em andamento) or 2 (Em Implementação)"
            )

    return create_projeto(db=db, projeto=projeto)

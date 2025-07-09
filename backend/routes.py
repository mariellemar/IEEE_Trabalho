from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .schemas import Projeto, ProjetoCreate
from .database import get_db
from .services import create_projeto

router = APIRouter()


@router.post("/", response_model=Projeto)
def create_project(projeto: ProjetoCreate, db: Session = Depends(get_db)):
    return create_projeto(db=db, projeto=projeto)

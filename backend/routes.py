from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas import Projeto, ProjetoCreate
from database import get_db
from services import create_projeto

router = APIRouter()


@router.post("/", response_model=Projeto)
def create_project(projeto: ProjetoCreate, db: Session = Depends(get_db)):

    if projeto.status not in ("1", "2"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be 1 (Em andamento) or 2 (Em Implementação)"
            )

    return create_projeto(db=db, projeto=projeto)


from services import (
    create_projeto,
    get_projetos,
    get_projeto_by_id,
    update_projeto,
    delete_projeto
)


@router.get("/", response_model=list[Projeto])
def list_project(db: Session = Depends(get_db)):
    return get_projetos(db)


@router.get("/{projeto_id}", response_model=Projeto)
def search_project(projeto_id: int, db: Session = Depends(get_db)):
    projeto = get_projeto_by_id(db, projeto_id)
    if not projeto:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return projeto


@router.put("/{projeto_id}", response_model=Projeto)
def update_project(projeto_id: int, dados: ProjetoCreate, db: Session = Depends(get_db)):
    projeto = update_projeto(db, projeto_id, dados)
    if not projeto:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return projeto


@router.delete("/{projeto_id}")
def delete_project(projeto_id: int, db: Session = Depends(get_db)):
    sucesso = delete_projeto(db, projeto_id)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return {"mensagem": "Removido"}

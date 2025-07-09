from sqlalchemy.orm import Session
from . import models, schemas


def create_projeto(db: Session, projeto: schemas.ProjetoCreate):
    db_projeto = models.Projeto(**projeto.dict())
    db.add(db_projeto)
    db.commit()
    db.refresh(db_projeto)

    return db_projeto

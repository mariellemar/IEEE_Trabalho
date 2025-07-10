from sqlalchemy.orm import Session
import models
import schemas


def create_projeto(db: Session, projeto: schemas.ProjetoCreate):
    db_projeto = models.Projeto(**projeto.dict())
    db.add(db_projeto)
    db.commit()
    db.refresh(db_projeto)

    return db_projeto


def get_projetos(db: Session):
    return db.query(models.Projeto).all()


def get_projeto_by_id(db: Session, projeto_id: int):
    return db.query(models.Projeto).filter(models.Projeto.id_projeto == projeto_id).first()


def update_projeto(db: Session, projeto_id: int, dados: schemas.ProjetoCreate):
    db_projeto = db.query(models.Projeto).filter(models.Projeto.id_projeto == projeto_id).first()
    if db_projeto is None:
        return None
    for key, value in dados.dict().items():
        setattr(db_projeto, key, value)
    db.commit()
    db.refresh(db_projeto)
    return db_projeto


def delete_projeto(db: Session, projeto_id: int):
    db_projeto = db.query(models.Projeto).filter(models.Projeto.id_projeto == projeto_id).first()
    if db_projeto is None:
        return False
    db.delete(db_projeto)
    db.commit()
    return True
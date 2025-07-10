from sqlalchemy import Column, Integer, String, Text, Date
from database import Base


class Projeto(Base):
    __tablename__ = "projeto"
    id_projeto = Column(Integer, primary_key=True, index=True)
    id_analise = Column(Integer, nullable=False)
    descricao_tecnica = Column(Text)
    data_inicio_projeto = Column(Date)
    data_final_projeto = Column(Date)
    arquiteto_responsavel = Column(String(100))
    status = Column(String(1))

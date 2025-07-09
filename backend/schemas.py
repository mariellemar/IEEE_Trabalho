from pydantic import BaseModel
from pydantic.alias_generators import to_camel
from datetime import date


class ProjetoBase(BaseModel):
    id_analise: int
    descricao_tecnica: str
    data_inicio_projeto: date
    data_final_projeto: date
    arquiteto_responsavel: str
    status: str  # '1' or '2'


class ProjetoCreate(ProjetoBase):
    pass


class Projeto(ProjetoBase):
    id_projeto: int

    class Config:
        alias_generator = to_camel
        validate_by_name = True
        orm_mode = True

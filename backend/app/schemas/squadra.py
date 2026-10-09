from pydantic import BaseModel, Field
from typing import Optional

class SquadraBase(BaseModel):
    nome: str = Field(..., max_length=40)
    immagine: Optional[str] = Field(None, max_length=500)
    colore_1: Optional[str] = Field(None, max_length=20)
    colore_2: Optional[str] = Field(None, max_length=20)
    in_corsa: bool = True

class SquadraCreate(SquadraBase):
    pass

class Squadra(SquadraBase):
    id: int

    class Config:
        from_attributes = True

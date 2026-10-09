from pydantic import BaseModel, Field
from typing import Optional

class GiocatoreBase(BaseModel):
    nome: str = Field(..., max_length=50)
    cognome: str = Field(..., max_length=100)
    nazionalita: Optional[str] = Field(None, max_length=100)
    telefono: Optional[str] = Field(None, max_length=15)
    telefono_confermato: bool = False
    squadra_id: Optional[int] = None

class GiocatoreCreate(GiocatoreBase):
    pass

class Giocatore(GiocatoreBase):
    id: int

    class Config:
        from_attributes = True

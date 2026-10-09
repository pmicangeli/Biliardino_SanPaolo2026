from pydantic import BaseModel
from typing import Optional

class RisultatoBase(BaseModel):
    id_partita: int
    id_squadra: int
    casa: bool
    giocata: bool = False
    gol: int = 0
    vittoria: bool = False

class RisultatoCreate(RisultatoBase):
    pass

class Risultato(RisultatoBase):
    class Config:
        from_attributes = True

from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional, List
from .squadra import Squadra # Assumed path, will verify if it fails

class PartitaBase(BaseModel):
    data: Optional[date] = None
    orario: Optional[datetime] = None

class PartitaCreate(PartitaBase):
    id_squadra_casa: int
    id_squadra_ospite: int

class Partita(PartitaBase):
    id: int
    # We add these to allow the frontend to receive the linked data
    # Since the actual relationship is via Risultato, we'll handle the mapping in the API
    squadraCasa: Optional['Squadra'] = None
    squadraOspite: Optional['Squadra'] = None
    risultatoCasa: Optional[int] = None
    risultatoOspite: Optional[int] = None
    giocata: bool = False

    class Config:
        from_attributes = True

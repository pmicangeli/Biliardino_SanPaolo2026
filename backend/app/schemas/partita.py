from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class PartitaBase(BaseModel):
    data: Optional[date] = None
    orario: Optional[datetime] = None

class PartitaCreate(PartitaBase):
    pass

class Partita(PartitaBase):
    id: int

    class Config:
        from_attributes = True

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from ..core.database import get_db
from ..models.models import Partita as PartitaModel
from ..schemas.partita import Partita, PartitaCreate

router = APIRouter(
    prefix="/partite",
    tags=["Partite"]
)

@router.get("/", response_model=List[Partita])
def read_partite(skip: int = 0, limit: int = 100, data: Optional[date] = None, db: Session = Depends(get_db)):
    query = db.query(PartitaModel)
    if data:
        query = query.filter(PartitaModel.data == data)

    partite = query.order_by(PartitaModel.data.asc(), PartitaModel.orario.asc()).offset(skip).limit(limit).all()
    return partite

@router.get("/{partita_id}", response_model=Partita)
def read_partita(partita_id: int, db: Session = Depends(get_db)):
    db_partita = db.query(PartitaModel).filter(PartitaModel.id == partita_id).first()
    if db_partita is None:
        raise HTTPException(status_code=404, detail="Partita non trovata")
    return db_partita

@router.post("/", response_model=Partita, status_code=status.HTTP_201_CREATED)
def create_partita(partita: PartitaCreate, db: Session = Depends(get_db)):
    db_partita = PartitaModel(**partita.model_dump())
    db.add(db_partita)
    db.commit()
    db.refresh(db_partita)
    return db_partita

@router.put("/{partita_id}", response_model=Partita)
def update_partita(partita_id: int, partita_update: PartitaCreate, db: Session = Depends(get_db)):
    db_partita = db.query(PartitaModel).filter(PartitaModel.id == partita_id).first()
    if db_partita is None:
        raise HTTPException(status_code=404, detail="Partita non trovata")

    for key, value in partita_update.model_dump().items():
        setattr(db_partita, key, value)

    db.commit()
    db.refresh(db_partita)
    return db_partita

@router.delete("/{partita_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_partita(partita_id: int, db: Session = Depends(get_db)):
    db_partita = db.query(PartitaModel).filter(PartitaModel.id == partita_id).first()
    if db_partita is None:
        raise HTTPException(status_code=404, detail="Partita non trovata")

    db.delete(db_partita)
    db.commit()
    return None

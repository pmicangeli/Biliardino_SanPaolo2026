from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models.models import Risultato as RisultatoModel
from ..schemas.risultato import Risultato, RisultatoCreate

router = APIRouter(
    prefix="/risultati",
    tags=["Risultati"]
)

@router.get("/", response_model=List[Risultato])
def read_risultati(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    risultati = db.query(RisultatoModel).offset(skip).limit(limit).all()
    return risultati

@router.post("/", response_model=Risultato, status_code=status.HTTP_201_CREATED)
def create_risultato(risultato: RisultatoCreate, db: Session = Depends(get_db)):
    # Controllo se il risultato esiste già (chiave composta)
    existing = db.query(RisultatoModel).filter(
        RisultatoModel.id_partita == risultato.id_partita,
        RisultatoModel.id_squadra == risultato.id_squadra,
        RisultatoModel.casa == risultato.casa
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Il risultato per questa squadra in questa partita esiste già")

    db_risultato = RisultatoModel(**risultato.model_dump())
    db.add(db_risultato)
    db.commit()
    db.refresh(db_risultato)
    return db_risultato

@router.put("/", response_model=Risultato)
def update_risultato(risultato_update: RisultatoCreate, db: Session = Depends(get_db)):
    db_risultato = db.query(RisultatoModel).filter(
        RisultatoModel.id_partita == risultato_update.id_partita,
        RisultatoModel.id_squadra == risultato_update.id_squadra,
        RisultatoModel.casa == risultato_update.casa
    ).first()

    if db_risultato is None:
        raise HTTPException(status_code=404, detail="Risultato non trovato")

    for key, value in risultato_update.model_dump().items():
        setattr(db_risultato, key, value)

    db.commit()
    db.refresh(db_risultato)
    return db_risultato

@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
def delete_risultato(id_partita: int, id_squadra: int, casa: bool, db: Session = Depends(get_db)):
    db_risultato = db.query(RisultatoModel).filter(
        RisultatoModel.id_partita == id_partita,
        RisultatoModel.id_squadra == id_squadra,
        RisultatoModel.casa == casa
    ).first()

    if db_risultato is None:
        raise HTTPException(status_code=404, detail="Risultato non trovato")

    db.delete(db_risultato)
    db.commit()
    return None

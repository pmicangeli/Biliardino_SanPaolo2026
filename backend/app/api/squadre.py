from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models.models import Squadra as SquadraModel
from ..schemas.squadra import Squadra, SquadraCreate

router = APIRouter(
    prefix="/squadre",
    tags=["Squadre"]
)

@router.get("/", response_model=List[Squadra])
def read_squadre(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    squadre = db.query(SquadraModel).offset(skip).limit(limit).all()
    return squadre

@router.get("/{squadra_id}", response_model=Squadra)
def read_squadra(squadra_id: int, db: Session = Depends(get_db)):
    db_squadra = db.query(SquadraModel).filter(SquadraModel.id == squadra_id).first()
    if db_squadra is None:
        raise HTTPException(status_code=404, detail="Squadra non trovata")
    return db_squadra

@router.post("/", response_model=Squadra, status_code=status.HTTP_201_CREATED)
def create_squadra(squadra: SquadraCreate, db: Session = Depends(get_db)):
    db_squadra = SquadraModel(**squadra.model_dump())
    db.add(db_squadra)
    db.commit()
    db.refresh(db_squadra)
    return db_squadra

@router.put("/{squadra_id}", response_model=Squadra)
def update_squadra(squadra_id: int, squadra_update: SquadraCreate, db: Session = Depends(get_db)):
    db_squadra = db.query(SquadraModel).filter(SquadraModel.id == squadra_id).first()
    if db_squadra is None:
        raise HTTPException(status_code=404, detail="Squadra non trovata")

    for key, value in squadra_update.model_dump().items():
        setattr(db_squadra, key, value)

    db.commit()
    db.refresh(db_squadra)
    return db_squadra

@router.delete("/{squadra_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_squadra(squadra_id: int, db: Session = Depends(get_db)):
    db_squadra = db.query(SquadraModel).filter(SquadraModel.id == squadra_id).first()
    if db_squadra is None:
        raise HTTPException(status_code=404, detail="Squadra non trovata")

    db.delete(db_squadra)
    db.commit()
    return None

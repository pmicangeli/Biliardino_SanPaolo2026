from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from ..core.database import get_db
from ..models.models import Giocatore as GiocatoreModel, Squadra as SquadraModel
from ..schemas.giocatore import Giocatore, GiocatoreCreate

router = APIRouter(
    prefix="/giocatori",
    tags=["Giocatori"]
)

@router.get("/", response_model=List[Giocatore])
def read_giocatori(
    skip: int = 0,
    limit: int = 100,
    squadra_nome: Optional[str] = None,
    nazionalita: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(GiocatoreModel)

    if squadra_nome:
        query = query.join(SquadraModel).filter(SquadraModel.nome == squadra_nome)

    if nazionalita:
        query = query.filter(GiocatoreModel.nazionalita == nazionalita)

    giocatori = query.offset(skip).limit(limit).all()
    return giocatori

@router.get("/{giocatore_id}", response_model=Giocatore)
def read_giocatore(giocatore_id: int, db: Session = Depends(get_db)):
    db_giocatore = db.query(GiocatoreModel).filter(GiocatoreModel.id == giocatore_id).first()
    if db_giocatore is None:
        raise HTTPException(status_code=404, detail="Giocatore non trovato")
    return db_giocatore

@router.post("/", response_model=Giocatore, status_code=status.HTTP_201_CREATED)
def create_giocatore(giocatore: GiocatoreCreate, db: Session = Depends(get_db)):
    db_giocatore = GiocatoreModel(**giocatore.model_dump())
    db.add(db_giocatore)
    db.commit()
    db.refresh(db_giocatore)
    return db_giocatore

@router.put("/{giocatore_id}", response_model=Giocatore)
def update_giocatore(giocatore_id: int, giocatore_update: GiocatoreCreate, db: Session = Depends(get_db)):
    db_giocatore = db.query(GiocatoreModel).filter(GiocatoreModel.id == giocatore_id).first()
    if db_giocatore is None:
        raise HTTPException(status_code=404, detail="Giocatore non trovato")

    for key, value in giocatore_update.model_dump().items():
        setattr(db_giocatore, key, value)

    db.commit()
    db.refresh(db_giocatore)
    return db_giocatore

@router.delete("/{giocatore_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_giocatore(giocatore_id: int, db: Session = Depends(get_db)):
    db_giocatore = db.query(GiocatoreModel).filter(GiocatoreModel.id == giocatore_id).first()
    if db_giocatore is None:
        raise HTTPException(status_code=404, detail="Giocatore non trovato")

    db.delete(db_giocatore)
    db.commit()
    return None

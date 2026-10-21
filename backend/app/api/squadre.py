from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from ..core.database import get_db
from ..models.models import Squadra as SquadraModel
from ..schemas.squadra import Squadra, SquadraCreate
from ..core.storage import storage_service

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
async def create_squadra(
    nome: str = Form(...),
    colore_1: Optional[str] = Form(None),
    colore_2: Optional[str] = Form(None),
    in_corsa: bool = Form(True),
    immagine: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    immagine_url = None
    if immagine:
        content = await immagine.read()
        file_name = f"{nome.replace(' ', '_').lower()}.jpg"
        immagine_url = storage_service.upload_file(content, file_name)

    db_squadra = SquadraModel(
        nome=nome,
        colore_1=colore_1,
        colore_2=colore_2,
        in_corsa=in_corsa,
        immagine=immagine_url
    )
    db.add(db_squadra)
    db.commit()
    db.refresh(db_squadra)
    return db_squadra

@router.put("/{squadra_id}", response_model=Squadra, status_code=status.HTTP_200_OK)
async def update_squadra(
    squadra_id: int,
    nome: str = Form(...),
    colore_1: Optional[str] = Form(None),
    colore_2: Optional[str] = Form(None),
    in_corsa: bool = Form(True),
    immagine: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    db_squadra = db.query(SquadraModel).filter(SquadraModel.id == squadra_id).first()
    if db_squadra is None:
        raise HTTPException(status_code=404, detail="Squadra non trovata")

    if immagine:
        content = await immagine.read()
        file_name = f"{nome.replace(' ', '_').lower()}.jpg"
        db_squadra.immagine = storage_service.upload_file(content, file_name)

    db_squadra.nome = nome
    db_squadra.colore_1 = colore_1
    db_squadra.colore_2 = colore_2
    db_squadra.in_corsa = in_corsa

    db.commit()
    db.refresh(db_squadra)
    return db_squadra

@router.delete("/{squadra_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_squadra(squadra_id: int, db: Session = Depends(get_db)):
    db_squadra = db.query(SquadraModel).filter(SquadraModel.id == squadra_id).first()
    if db_squadra is None:
        raise HTTPException(status_code=404, detail="Squadra non trovata")

    if db_squadra.immagine:
        # Extract filename from URL to delete from storage
        file_name = db_squadra.immagine.split('/')[-1]
        storage_service.delete_file(file_name)

    db.delete(db_squadra)
    db.commit()
    return None

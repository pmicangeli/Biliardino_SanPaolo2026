from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from ..core.database import get_db
from ..models.models import Partita as PartitaModel, Risultato as RisultatoModel
from ..schemas.partita import Partita, PartitaCreate

router = APIRouter(
    prefix="/partite",
    tags=["Partite"]
)

@router.get("/classifica", response_model=List[dict])
def read_classifica(db: Session = Depends(get_db)):
    from ..models.models import Squadra as SquadraModel

    squadre = db.query(SquadraModel).all()
    classifica = []

    for s in squadre:
        # Trova tutti i risultati di questa squadra, solo per le partite effettivamente giocate
        risultati = db.query(RisultatoModel).filter(
            RisultatoModel.id_squadra == s.id,
            RisultatoModel.giocata == True
        ).all()

        partite_giocate = len(risultati)
        vittorie = sum(1 for r in risultati if r.vittoria)
        sconfitte = partite_giocate - vittorie
        gol_fatti = sum(r.gol for r in risultati)

        # Per i gol subiti, dobbiamo sommare i gol dell'avversario per ogni partita giocata
        gol_subiti = 0
        for r in risultati:
            # Trova l'avversario nella stessa partita
            avversario = db.query(RisultatoModel).filter(
                RisultatoModel.id_partita == r.id_partita,
                RisultatoModel.id_squadra != s.id
            ).first()
            if avversario:
                gol_subiti += avversario.gol

        classifica.append({
            "id": s.id,
            "nome": s.nome,
            "immagine": s.immagine,
            "partiteGiocate": partite_giocate,
            "vittorie": vittorie,
            "sconfitte": sconfitte,
            "golFatti": gol_fatti,
            "golSubiti": gol_subiti,
            "differenza": gol_fatti - gol_subiti,
            "punti": vittorie * 3
        })

    # Ordina per punti (decrescente), poi per differenza gol (decrescente)
    classifica.sort(key=lambda x: (x['punti'], x['differenza']), reverse=True)

    return classifica

@router.get("/", response_model=List[Partita])
def read_partite(skip: int = 0, limit: int = 100, data: Optional[date] = None, db: Session = Depends(get_db)):
    query = db.query(PartitaModel)
    if data:
        query = query.filter(PartitaModel.data == data)

    partite_db = query.order_by(PartitaModel.data.asc(), PartitaModel.orario.asc()).offset(skip).limit(limit).all()

    results_list = []
    for p in partite_db:
        risultati = db.query(RisultatoModel).filter(RisultatoModel.id_partita == p.id).all()
        res_casa = next((r for r in risultati if r.casa), None)
        res_ospite = next((r for r in risultati if not r.casa), None)

        giocata = res_casa.giocata if res_casa else False

        results_list.append({
            "id": p.id,
            "data": p.data,
            "orario": p.orario,
            "squadraCasa": res_casa.squadra if res_casa else None,
            "squadraOspite": res_ospite.squadra if res_ospite else None,
            "risultatoCasa": res_casa.gol if res_casa else None,
            "risultatoOspite": res_ospite.gol if res_ospite else None,
            "giocata": giocata
        })

    return results_list

@router.get("/{partita_id}", response_model=Partita)
def read_partita(partita_id: int, db: Session = Depends(get_db)):
    db_partita = db.query(PartitaModel).filter(PartitaModel.id == partita_id).first()
    if db_partita is None:
        raise HTTPException(status_code=404, detail="Partita non trovata")

    risultati = db.query(RisultatoModel).filter(RisultatoModel.id_partita == db_partita.id).all()
    res_casa = next((r for r in risultati if r.casa), None)
    res_ospite = next((r for r in risultati if not r.casa), None)

    return {
        "id": db_partita.id,
        "data": db_partita.data,
        "orario": db_partita.orario,
        "squadraCasa": res_casa.squadra if res_casa else None,
        "squadraOspite": res_ospite.squadra if res_ospite else None,
        "risultatoCasa": res_casa.gol if res_casa else None,
        "risultatoOspite": res_ospite.gol if res_ospite else None,
        "giocata": res_casa.giocata if res_casa else False
    }

@router.post("/", response_model=Partita, status_code=status.HTTP_201_CREATED)
def create_partita(partita_in: PartitaCreate, db: Session = Depends(get_db)):
    # 1. Crea la partita
    nuova_partita = PartitaModel(
        data=partita_in.data,
        orario=partita_in.orario
    )
    db.add(nuova_partita)
    db.commit()
    db.refresh(nuova_partita)

    # 2. Crea i due record di Risultato (Casa e Ospite)
    # Squadra di casa
    res_casa = RisultatoModel(
        id_partita=nuova_partita.id,
        id_squadra=partita_in.id_squadra_casa,
        casa=True,
        gol=0,
        giocata=False,
        vittoria=False
    )
    # Squadra ospite
    res_ospite = RisultatoModel(
        id_partita=nuova_partita.id,
        id_squadra=partita_in.id_squadra_ospite,
        casa=False,
        gol=0,
        giocata=False,
        vittoria=False
    )

    db.add(res_casa)
    db.add(res_ospite)
    db.commit()

    # Restituisce l'oggetto completo come richiesto dal frontend
    return {
        "id": nuova_partita.id,
        "data": nuova_partita.data,
        "orario": nuova_partita.orario,
        "squadraCasa": res_casa.squadra,
        "squadraOspite": res_ospite.squadra,
        "risultatoCasa": res_casa.gol,
        "risultatoOspite": res_ospite.gol,
        "giocata": res_casa.giocata
    }

@router.put("/{partita_id}", response_model=Partita)
def update_partita(partita_id: int, partita_update: PartitaCreate, db: Session = Depends(get_db)):
    db_partita = db.query(PartitaModel).filter(PartitaModel.id == partita_id).first()
    if db_partita is None:
        raise HTTPException(status_code=404, detail="Partita non trovata")

    for key, value in partita_update.model_dump().items():
        setattr(db_partita, key, value)

    db.commit()
    db.refresh(db_partita)

    risultati = db.query(RisultatoModel).filter(RisultatoModel.id_partita == db_partita.id).all()
    res_casa = next((r for r in risultati if r.casa), None)
    res_ospite = next((r for r in risultati if not r.casa), None)

    return {
        "id": db_partita.id,
        "data": db_partita.data,
        "orario": db_partita.orario,
        "squadraCasa": res_casa.squadra if res_casa else None,
        "squadraOspite": res_ospite.squadra if res_ospite else None,
        "risultatoCasa": res_casa.gol if res_casa else None,
        "risultatoOspite": res_ospite.gol if res_ospite else None,
        "giocata": res_casa.giocata if res_casa else False
    }

@router.delete("/{partita_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_partita(partita_id: int, db: Session = Depends(get_db)):
    db_partita = db.query(PartitaModel).filter(PartitaModel.id == partita_id).first()
    if db_partita is None:
        raise HTTPException(status_code=404, detail="Partita non trovata")

    db.delete(db_partita)
    db.commit()
    return None


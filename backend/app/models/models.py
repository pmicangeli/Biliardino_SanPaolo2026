from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date, DateTime
from sqlalchemy.orm import relationship
from ..core.database import Base

class Squadra(Base):
    __tablename__ = "squadra"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(40), nullable=False)
    immagine = Column(String(500))
    colore_1 = Column(String(20))
    colore_2 = Column(String(20))
    in_corsa = Column(Boolean, default=True)

    giocatori = relationship("Giocatore", back_populates="squadra")
    risultati = relationship("Risultato", back_populates="squadra")

class Giocatore(Base):
    __tablename__ = "giocatore"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(50), nullable=False)
    cognome = Column(String(100), nullable=False)
    nazionalita = Column(String(100))
    telefono = Column(String(15))
    telefono_confermato = Column(Boolean, default=False)
    squadra_id = Column(Integer, ForeignKey("squadra.id"))

    squadra = relationship("Squadra", back_populates="giocatori")

class Partita(Base):
    __tablename__ = "partita"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(Date)
    orario = Column(DateTime)

    risultati = relationship("Risultato", back_populates="partita")

class Risultato(Base):
    __tablename__ = "risultati"

    id_partita = Column(Integer, ForeignKey("partita.id"), primary_key=True)
    id_squadra = Column(Integer, ForeignKey("squadra.id"), primary_key=True)
    casa = Column(Boolean, primary_key=True)

    giocata = Column(Boolean, default=False)
    gol = Column(Integer, default=0)
    vittoria = Column(Boolean, default=False)

    partita = relationship("Partita", back_populates="risultati")
    squadra = relationship("Squadra", back_populates="risultati")

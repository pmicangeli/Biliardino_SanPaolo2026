from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import engine
from .models import models
from .api import squadre, giocatori, partite, risultati

# Create tables on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Biliardino San Paolo API",
    description="Backend per la gestione del Torneo di Biliardino 2026",
    version="0.1.0"
)

# Configurazione CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In produzione limiteremo a ["http://localhost:4200"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(squadre.router)
app.include_router(giocatori.router)
app.include_router(partite.router)
app.include_router(risultati.router)

@app.get("/")
async def root():
    return {"message": "Benvenuto nell'API del Torneo di Biliardino San Paolo 2026!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

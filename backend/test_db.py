import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

# Carica le variabili d'ambiente dal file .env
load_dotenv()

def test_connection():
    db_url = os.getenv("DATABASE_URL")

    if not db_url:
        print("❌ ERRORE: DATABASE_URL non trovata nel file .env")
        return

    print(f"Tentativo di connessione a: {db_url.split('@')[-1]}...") # Nasconde password per sicurezza

    try:
        # Crea l'engine di connessione
        engine = create_engine(db_url)

        # Tenta di eseguire una query semplicissima
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            if result.scalar() == 1:
                print("✅ CONNESSIONE RIESCITA! Il backend può comunicare con Supabase.")
    except SQLAlchemyError as e:
        print("\n❌ ERRORE DI CONNESSIONE AL DATABASE:")
        print("-" * 50)
        print(str(e))
        print("-" * 50)

        # Suggerimenti basati sull'errore
        err_msg = str(e).lower()
        if "password authentication failed" in err_msg:
            print("\n💡 SUGGERIMENTO: La password del database è errata. Verifica il file .env.")
        elif "timeout" in err_msg or "could not connect" in err_msg:
            print("\n💡 SUGGERIMENTO: Timeout di rete. Controlla il firewall o se l'IP è autorizzato in Supabase.")
        elif "invalid connection string" in err_msg:
            print("\n💡 SUGGERIMENTO: L'URL del database è malformato. Verifica la sintassi in .env.")
    except Exception as e:
        print(f"\n❌ ERRORE INATTESO: {e}")

if __name__ == "__main__":
    test_connection()

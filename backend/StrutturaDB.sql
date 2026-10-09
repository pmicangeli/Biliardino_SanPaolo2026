CREATE TABLE Giocatore (
	Id INTEGER PRIMARY KEY,
	Nome Varchar(50),
	Cognome Varchar(100), 
	Nazionalita Varchar(100),
	Telefono Varchar(15),
	Telefono_Confermato BOOLEAN,
	Id_squadra Integer [FK (Squadra.Id)]
);

CREATE TABLE Squadra (
	Id INTEGER PRIMARY KEY,
	Nome Varchar(40),
	Imamgine Varchar(500), 
	Colore_1 Varchar(20),
	Colore_2 Varchar(20),
	In_corsa BOOLEAN (DEFAULT TRUE)
);

Create Table Partita (
	Id INTEGER PRIMARY KEY,
	Data Date,
	Orario TIMESTAMP
);

Create Table Risultati (
	Id_partita Integer [FK (Partita.Id)],
	Id_squadra Integer [FK (Squadra.Id)],
	Giocata BOOLEAN (DEFAULT False),
	Gol Integer,
	Casa Boolean,
	Vittoria BOOLEAN (DEFAULT False)
)
PRIMARY Key (Id_partita, Id_sqadra, Casa);

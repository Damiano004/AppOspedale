DROP DATABASE IF EXISTS Ospedale;

CREATE DATABASE Ospedale;
USE Ospedale;

-- OSPEDALI
CREATE Table Ospedali(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(35),
    citta VARCHAR(35),
    PRIMARY KEY (id)
);

-- ANAGRAFICA
CREATE TABLE Anagrafica(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    data_nascita DATE NOT NULL,
    codice_fiscale VARCHAR(16) UNIQUE NOT NULL
);

-- REPARTO
CREATE TABLE Reparto(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descrizione TEXT
);

-- PAZIENTE
CREATE TABLE Paziente(
    id INT AUTO_INCREMENT PRIMARY KEY,
    codice VARCHAR(6),
    codice_colore ENUM('BIANCO', 'VERDE', 'AZZURRO', 'ARANCIONE', 'ROSSO'),
    stato ENUM('IN CARICO','IN ATTESA', 'TRASFERITO', 'DIMESSO'),
    reparto_id INT,
    id_ospedale INT NOT NULL,
    anagrafica_id INT NOT NULL,
   
    FOREIGN KEY (reparto_id) REFERENCES Reparto(id),
    FOREIGN KEY (id_ospedale) REFERENCES Ospedali(id),
    FOREIGN KEY (anagrafica_id) REFERENCES Anagrafica(id)
);

-- OSPEDALI_REPARTO
CREATE Table Ospedali_Reparto(
    id INT NOT NULL AUTO_INCREMENT,
    id_reparto INT NOT NULL,
    id_ospedale INT NULL NULL,
    PRIMARY KEY (id),
    Foreign Key (id_reparto) REFERENCES Reparto(id),
    Foreign Key (id_ospedale) REFERENCES Ospedali(id)
);

INSERT INTO Anagrafica (nome, cognome, data_nascita, codice_fiscale) VALUES
('Mario', 'Rossi', '1980-05-15', 'RSSMRA80M15H501Z'),
('Luigi', 'Verdi', '1975-09-23', 'VRDLGU75P23F205X'),
('Anna', 'Bianchi', '1990-12-11', 'BNCHNN90T51L736Y'),
('Carla', 'Neri', '1985-07-30', 'NRECRL85L70A662W'),
('Giorgio', 'Gialli', '1992-03-20', 'GLLGRG92C20H501Y'),
('Paola', 'Blu', '1988-11-25', 'BLUPLA88S65F205V'),
('Stefano', 'Marroni', '1970-01-10', 'MRRSTF70A10L736U'),
('Elena', 'Azzurri', '1995-06-05', 'ZZRLNE95H45A662T'),
('Roberto', 'Viola', '1982-04-17', 'VLARRT82D17H501S'),
('Laura', 'Arancioni', '1978-08-29', 'RNCLEU78M29F205R'),
('Pietro', 'Rocchio', '2001-01-19', 'RCCPTR01A19H612K');

INSERT INTO Reparto (nome, descrizione) VALUES
('Cardiologia', 'Reparto specializzato nelle malattie cardiovascolari'),
('Neurologia', 'Reparto dedicato alle patologie del sistema nervoso'),
('Ortopedia', 'Reparto focalizzato su ossa e muscoli'),
('Pediatria', 'Reparto dedicato alla cura dei bambini'),
('Chirurgia Generale', 'Reparto per interventi chirurgici di varia natura'),
('Pronto Soccorso', 'Reparto emergenza/urgenza');

INSERT INTO Ospedali (nome, citta) VALUES
("Santa Chiara", "Trento"),
("Val di sogno", "Malcesine"),
("Borgo Trento", "Verona"),
("Ospedale Sacro Cuore Don Calabria", "Negrar"),
("Pederzoli","Peschiera del Garda");

INSERT INTO Ospedali_Reparto(id_ospedale,id_reparto) VALUES
(1,1), (1,2), (1,4), (1,5), (1,6),
(2,6),
(3,2), (3,4), (3,6),
(4,1), (4,2), (4,4), (4,5), (4,6),
(5,3), (5,5), (5,6);

-- Assegnazione Pazienti
INSERT INTO Paziente (anagrafica_id, reparto_id, id_ospedale, codice, codice_colore, stato) VALUES
(1, 1, 1, 'MR515', 'VERDE', 'IN CARICO'),
(3, 4, 1, 'AB901', 'ARANCIONE', 'TRASFERITO'),
(4, 2, 1, 'CN730', 'BIANCO', 'DIMESSO'),
(11, 6, 2,'PR191', 'AZZURRO', 'IN CARICO'),
(2, 2, 3, 'LV923', 'VERDE', 'IN CARICO'),
(6, 6, 2, 'PB125', 'AZZURRO', 'IN ATTESA'),
(7, 6, 2, 'SM110', 'ROSSO', 'IN CARICO'),
(8, 3, 5, 'EA605', 'BIANCO', 'TRASFERITO'),
(9, 4, 3, 'RV417', 'ARANCIONE', 'IN CARICO'),
(5, NULL, 2, 'GG320', 'ROSSO', NULL);
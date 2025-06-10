// const mysql = require('mysql2/promise');
import * as mysql from 'mysql2/promise';
import { createHttpResponceKO, createHttpResponceOK } from './ResponceManager';

// import { process } from 'node:process'

// npm i -D @types/node
const dbConfig = {
    host: process.env.db_host,
    user: process.env.user,       // Cambia se necessario
    password: process.env.password,       // Cambia se necessario
    database: process.env.database,
    port: process.env.port,
};

export const listaPz = async (event) => {
    let connection;

    try {
        // Connesione al DB
        connection = await mysql.createConnection(dbConfig);

        if(!event.pathParameters){
            throw new Error("Non è stato passato l'ospedale nella query della richiesta");
        }

        let pathParam = event.pathParameters;

        if (!pathParam['id']) {
            throw new Error("Non è stato trovato il parametro 'ID'");
        }

        // Eseguiamo la query
        const [row] = await connection.execute(`
            SELECT 
                p.id as id_paziente,
                p.codice,
                p.codice_colore,
                p.stato,
                r.id as id_reparto,
                r.nome as nome_reparto,
                r.descrizione,
                a.id as id_anagrafica,
                a.nome,
                a.cognome,
                a.data_nascita,
                a.codice_fiscale
            FROM Paziente p 
            LEFT JOIN Reparto r ON p.reparto_id = r.id
            JOIN Anagrafica a ON p.anagrafica_id = a.id
            WHERE p.id_ospedale = ?;`,
            [pathParam['id']]
        );
        
        return createHttpResponceOK(row);
    } catch (error) {
        return createHttpResponceKO(error);
    } finally{
        connection.end();
    }
};

export const listaOspedali = async() =>{
    let connection;
    try{
        connection = await mysql.createConnection(dbConfig);

        const [row] = await connection.execute("SELECT id, nome, citta FROM Ospedali");

        return createHttpResponceOK(row);
    }catch (error){
        return createHttpResponceKO(error);
    }finally{
        connection.end();
    }
}

export const listaRepartiOspedale = async(event) =>{
    let connection;

    try{
        connection = await mysql.createConnection(dbConfig);

        if(!event.pathParameters){
            throw new Error("Non è stato passato l'ospedale nella query della richiesta");
        }

        let pathParam = event.pathParameters;

        if (!pathParam['id']) {
            throw new Error("Non è stato trovato il parametro 'ID'");
        }

        const [row] = await connection.execute(
            `
                SELECT r.id, r.nome, r.descrizione
                    FROM Ospedali o
                    JOIN Ospedali_Reparto osr ON o.id = osr.id_ospedale
                    JOIN Reparto r  ON r.id = osr.id_reparto
                    WHERE o.id = ?
            `,
            [pathParam['id']]
        );
        return createHttpResponceOK(row);
    }catch(error){
        return createHttpResponceKO(error);
    }finally{
        connection.end();
    }
}

export const modificaPaziente = async(event) => {
    let connection;

    try{
        connection = await mysql.createConnection(dbConfig);

        if(!event.body){
            throw new Error("Non è stato passato il paziente nel body della richiesta");
        }

        let pzParamTmp = JSON.parse(event.body.trim());

        await connection.execute(`
            UPDATE Paziente p
            JOIN Anagrafica a ON p.anagrafica_id = a.id
            SET 
                a.nome = ?, 
                a.cognome = ?, 
                a.data_nascita = ?,
                a.codice_fiscale = ?, 
                p.codice_colore = ?, 
                p.stato = ?, 
                p.reparto_id = ?,
                p.codice = ?
            WHERE p.id = ?;`,
            [
                pzParamTmp.nome, 
                pzParamTmp.cognome,
                pzParamTmp.dataNascita,
                pzParamTmp.codiceFiscale, 
                pzParamTmp.codiceColore, 
                pzParamTmp.stato, 
                pzParamTmp.reparto,
                pzParamTmp.codice,
                pzParamTmp.idPz                
            ]
        );
        return createHttpResponceOK({
            messaggio: "Modificato il paziente",
            pzId: pzParamTmp.idPz
        });
    }catch(error){
        return createHttpResponceKO(error);
    }finally{
        connection.end();
    }
}

export const accettaPzTrasferta = async(event) =>{
    let connection;

    try{
        connection = await mysql.createConnection(dbConfig);

        if (!event.body) {
            throw new Error("Non è stato passato il paziente nel body della richiesta");
        }

        let pzParamTmp = JSON.parse(event.body.trim());

        await connection.execute(`
                UPDATE Paziente
                SET stato = ?, reparto_id = ?
                WHERE id = ?
            `,
            [pzParamTmp.stato, pzParamTmp.id_reparto, pzParamTmp.idPz]
        );
        return createHttpResponceOK({
            messaggio: "Trasferito il paziente",
            pzId: pzParamTmp.idPz
        });
    }catch(error){
        return createHttpResponceKO(error);
    }finally{
        connection.end();
    }
}

export const accettaPz = async (event) => {
    let connection;

    try {
        // Connesione al DB
        connection = await mysql.createConnection(dbConfig);

        if (!event.body) {
            throw new Error("Non è stato passato il paziente nel body della richiesta");
        }

        let pzTmp = JSON.parse(event.body.trim());

        // Eseguiamo la query
        const [pzCreation] = await connection.execute(`
            INSERT INTO Anagrafica (nome, cognome, data_nascita, codice_fiscale)
            VALUES (?, ?, ?, ?);
        `,
        [pzTmp.nome, pzTmp.cognome, new Date(pzTmp.dataNascita), pzTmp.codiceFiscale]);


        let pzNewID = pzCreation.insertId;

        const [newPazient] = await connection.execute(`
            INSERT INTO Paziente (anagrafica_id, reparto_id, codice, codice_colore, stato, id_ospedale)
            VALUES (?, (SELECT id from Reparto r WHERE nome = 'Pronto Soccorso' LIMIT 1), ?, ?, ?, ?);
        `,
        [pzNewID, pzTmp.codice, pzTmp.codiceColore, pzTmp.stato, pzTmp.id_ospedale]);


        return createHttpResponceOK({
            messaggio: "Creato Paziente",
            pzID: newPazient.insertId
        });
    } catch (error) {
        return createHttpResponceKO(error);
    } finally{
        connection.end();
    }
};

export const trasferisciPz = async (event) => { 
    let connection;

    try {
        // Connesione al DB
        connection = await mysql.createConnection(dbConfig);
        // pathParameters: { id: 'CIAO23' },

        console.log(event);

        if (!event.pathParameters) {
            throw new Error("Non è stato passato il paziente nel PARAMETRO della richiesta");
        }

        let pathParam = event.pathParameters;
        if (!pathParam['idPz'] && !pathParam['idOs']) {
            throw new Error("Non sono stati trovati uno o più id nell'URL");
        }

        const [updatedPazient] = await connection.execute(`
            UPDATE Paziente p 
                SET stato = 'TRASFERITO', reparto_id = NULL, id_ospedale = ?
                WHERE p.id = ?;
        `,
        [pathParam['idOs'],pathParam['idPz']]);

        return createHttpResponceOK({
            messaggio: updatedPazient.info,
            affectedRows: updatedPazient.affectedRows
        });

    } catch (error) {
        return createHttpResponceKO(error);
    } finally{
        connection.end();
    }
};

export const dimettiPz = async (event) => { 
    let connection;

    try {
        // Connesione al DB
        connection = await mysql.createConnection(dbConfig);
        // pathParameters: { id: 'CIAO23' },

        console.log(event);

        if (!event.pathParameters) {
            throw new Error("Non è stato passato il paziente nel PARAMETRO della richiesta");
        }

        let pathParam = event.pathParameters;
        if (!pathParam['id']) {
            throw new Error("Non è stato trovato il parametro 'ID'");
        }

        const [dismissedPazient] = await connection.execute(`
            UPDATE Paziente p 
            SET stato = 'DIMESSO', reparto_id = NULL 
            WHERE p.id = ?;
        `,
        [pathParam['id']]);

        return createHttpResponceOK({
            messaggio: dismissedPazient.info,
            affectedRows: dismissedPazient.affectedRows
        });

    } catch (error) {
        return createHttpResponceKO(error);
    } finally{
        connection.end();
    }
};
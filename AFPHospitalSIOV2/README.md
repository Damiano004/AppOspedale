# AFPOspedale


Componenti gruppo:
    Damiano Purin
    Davide Comper
    Mael Ossanna Thimon


Scopo del progetto
GPI utilizza un sistema sviluppato internamente per gestire le accettazioni al pronto soccorso, già in uso presso diversi clienti.

Il software è disponibile sia in modalità on premise (installato sui server del cliente), sia come servizio cloud (su infrastruttura pubblica o privata). Per questo motivo, il sistema deve poter funzionare in entrambe le modalità.

Il progetto prevede lo sviluppo di una mini-webapp (modulo Angular) che consenta al personale amministrativo e sanitario di gestire l’accesso urgente di un paziente in una struttura di pronto soccorso.

Questa webapp dovrà:

Comunicare con i servizi backend per registrare le accettazioni.

Ricevere dati da applicativi esterni (ad esempio, dati anagrafici del paziente) per supportare meglio gli operatori.

Interfacciarsi con sistemi di terze parti come LIS (Laboratorio), RIS (Radiologia), monitor, sistemi di presenza, ecc.

Tra le informazioni da gestire durante l’accettazione del paziente ci sono, ad esempio:

- Dati anagrafici del paziente;

- Codice di priorità (livello d’urgenza);

- Stato della procedura di accettazione;

- Allergie conosciute;

- Terapie previste;

- Altri dati clinici utili.




------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Requisiti
- Node.js (consigliata versione ≥ 18)
- npm (incluso con Node.js)
- Angular CLI (per AFPHospitalSIOV2)
- Serverless Framework (per AFPHospitalAPI)

## QuickStart
CARTELLA: ./AFPHospitalAPI:
- installazione serverless
```bash
npm install serverless-offline --save-dev
```
- avvio
```bash
npx serverless offline
```
CARTELLA ./AFPHospitalSIOV2:
- installazione angular
```bash
npm install
```
- installazione primeNG:
```bash
npm install primeng @primeng/themes
npm install primeicons
```

- avvio:
```bash
npm run start 
```

# Moment 2.1 i kursen DT207g

## Sammanfattning
En REST-webbtjänst som är utvecklad med NodeJS, Express och SQLite. Applikationen haterar arbetserfarenheter. Den haterar CRUD-operatiner och input valideras om information saknas med tydliga felmeddelanden. 

## Installation av databas
För att installera klona källkodsfiler och kör därefter npm install för att installera nödvändiga paket. Kör sedan installations scriptet install.js för att skapa databasen.  och sedan npm run start för att starta applikationen.

## Användning CURD
Nedan finns beskrivet hur man använder webbtjänsten på olika vis:
| Metod         | Ändpunkt                 | Beskrivning      |
| ------------- |:------------------------:| ----------------:|
| GET           | /workexperience          | Hämtar alla tillgängliga arbetserfarenheter. |
| GET           | /workexperience/ID       |   	Hämtar en specifik arbetserfarenhet med angivet ID. |
| POST          | /workexperience     |    Lagrar en ny arbetserafarenhet. Kräver att ett objekt skickas med. |
| PUT           | /workexperience/ID     |    Uppdaterar en existerande arbetserfarenhet med angivet ID. Kräver att ett bjekt skickas med. |
| DELETE        | /workexperience/ID     |    Raderar en arbetserfarenhet med angivet ID. |


Ett objekt skickas som jJSON med följande struktur:
{
    "companyname": "Intersport Åre",
    "jobtitle": "Butikssäljare",
    "location": "Åre",
    "startdate": "2018-12-01",
    "enddate": "2020-05-10",
    "description": "Säljare"
}

### Utvecklad av
Sabina Liljeström

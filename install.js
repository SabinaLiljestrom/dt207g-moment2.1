/**
 * install-script för cv 
 * Av Sabina Liljeström
 */ 

const sqlite3 = require("sqlite3").verbose();

// skapa databas
const db = new sqlite3.Database("./db/workexperience.db");

// Skapa tabell med id | companyname | jobtitle | location | startdate  | enddate | description  
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS cv;");

    db.run(`
    CREATE TABLE IF NOT EXISTS workexperience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyname TEXT NOT NULL,
        jobtitle TEXT NOT NULL,
        location TEXT NOT NULL,
        startdate TEXT NOT NULL,
        enddate TEXT,
        description TEXT
    );
    `);
});

db.close();
console.log("Database and table created successfully.");
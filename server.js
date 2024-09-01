/**
 * Arbetserfarenheter
 * Av Sabina Liljeström
 */
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
let port = process.env.PORT || 3005;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Anslut till databasen
const db = new sqlite3.Database('./db/workexperience.db');

// CRUD Operationer (skapa, läsa, uppdatera, ta bort)

// Valideringsregler
const validateWorkExperience = [
    body('companyname').notEmpty().withMessage('Företagsnamn saknas.'),
    body('jobtitle').notEmpty().withMessage('Arbetsrollens titel saknas.'),
    body('location').notEmpty().withMessage('Plats saknas.'),
    body('startdate').isISO8601().withMessage('Startdatum måste vara ett giltigt datum.'),
    body('enddate').optional({ nullable: true }).isISO8601().withMessage('Slutdatum måste vara ett giltigt datum om det anges.'),
    body('description').notEmpty().withMessage('Beskrivning saknas.'),
];

// Skapa (POST)
app.post('/workexperience', validateWorkExperience, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    db.run(
        `INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [companyname, jobtitle, location, startdate, enddate, description],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});

// Uppdatera (PUT)
app.put('/workexperience/:id', validateWorkExperience, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    db.run(
        `UPDATE workexperience SET 
             companyname = ?, 
             jobtitle = ?, 
             location = ?, 
             startdate = ?, 
             enddate = ?, 
             description = ?
         WHERE id = ?`,
        [companyname, jobtitle, location, startdate, enddate, description, id],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ updatedID: id });
        }
    );
});

// Läsa (GET)
app.get('/workexperience', (req, res) => {
    db.all(`SELECT * FROM workexperience`, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.get('/workexperience/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM workexperience WHERE id = ?`, [id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: row });
    });
});

// Ta bort (DELETE)
app.delete('/workexperience/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM workexperience WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ deletedID: id });
    });
});

// Starta servern och hantera portkonflikter
const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is already in use. Trying another port...`);
            startServer(port + 1);  // Försök med nästa port
        } else {
            console.error(err);
        }
    });
};

startServer(port);

const express = require('express');
const rutas = require('./routes');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { createPool } = require('mysql2-promise');
require('dotenv').config();

const bodyParser = require('body-parser');



const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


app.get("/ping", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM usuarios");
        console.log("Resultados:", rows);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Error en la consulta:", err);
        res.status(500).send("Error en la base de datos");
    }
});

/* app.use('', rutas); */


app.listen(3000)
console.log('Servidor en puerto 3000')
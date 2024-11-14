const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const cors = require('cors');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
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

const TOKEN_EXPIRATION = '1h';

app.post('/register', async (req, res) => {
    console.log(req.body)
    const { email, password, nombre } = req.body
    try {
        let consulta = 'SELECT * FROM usuarios where email = ?'
        let [user] = await db.query(consulta, [email]);
        console.log(user)

        if (user.length > 0) {
            console.log("El usuario ya existe")
            return res.send({ status: false, mensaje: 'El usuario ya existe' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const formattedDate = format(new Date(), "yyyy-MM-dd hh:mm:ss a");
        console.log(formattedDate);

        console.log('Informacion de registro')
        console.table([{ email, nombre, hashedPassword }])

        consulta = "INSERT INTO usuarios(email,hashPassword,nombre,fechaRegistro,ultimoIngreso) VALUES(?,?,?,?,?)"
        const parametros = [email, hashedPassword, nombre, formattedDate, formattedDate]
        await db.query(consulta, parametros);

        [user] = await db.query('SELECT * FROM usuarios where email = ?', [email]);
        console.log([user])

        console.log(user[0])
        const token = jwt.sign({ email: user[0].email }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
        return res.send({ status: true, mensaje: 'Usuario registrado correctamente', token })
    } catch (err) {
        console.error("Error en la consulta:", err);
        return res.send({ status: false, mensaje: 'Error en la base de datos' })
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        let consulta = 'SELECT * FROM usuarios where email = ?'
        let [user] = await db.query(consulta, [email]);
        console.log(user)

        if (user.length == 0) {
            console.log("Usuario no encontrado")
            return res.send({ status: false, mensaje: 'El usuario no existe' })
        }

        console.log(password, user.hashpassword)
        const passwordValido = await bcrypt.compare(password, user[0].hashPassword);
        if (!passwordValido) {
            console.log("password no valido")
            return res.send({ status: false, mensaje: "Usuario o contraseña inválidos" })
        }

        console.log("todo salio bien");
        console.log(user);
        const formattedDate = format(new Date(), "yyyy-MM-dd hh:mm:ss a");
        await db.query("UPDATE usuarios SET ultimoIngreso = ? where email = ?", [formattedDate, email])

        const token = jwt.sign({ email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.send({ status: true, mensaje: 'Inicio de sesión exitoso', token })

    } catch (err) {
        console.error("Error en la consulta:", err);
        res.status(500).send("Error en la base de datos");
    }
});

app.get('/usuarios', auth, async (req, res) => {
    try {
        let consulta = 'SELECT email,nombre,fechaRegistro,ultimoIngreso FROM usuarios'
        let [users] = await db.query(consulta, [req.email]);
        return res.send({ status: true, datos: users })
    } catch (error) {
        return res.send({ status: false })
    }
});

async function auth(req, res, next) {
    console.log(req.headers)
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).send('Acceso denegado. Token no provisto');


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        let consulta = 'SELECT * FROM usuarios where email = ?'
        let [user] = await db.query(consulta, [decoded.email]);
        console.log(user)

        if (user.length == 0) {
            console.log("Usuario no encontrado")
            return res.send({ status: false, mensaje: 'Usuario no encontrado' })
        }

        req.email = decoded.email

        next();
    } catch (ex) {
        console.error('Error al verificar el token:', ex);
        return res.send({ status: false, mensaje: 'Token no válido' })
    }
}

app.listen(port)
console.log('Servidor en puerto ' + port)
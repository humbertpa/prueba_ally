const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class ControladorUsuario {

    static async registrar(req, res) {
        console.log("================================== Entro a registrar en controller de usuario==========================");

        try {
            const user = await Usuario.findOne({ correo: req.body.email });

            if (user) {
                console.log("El usuario ya existe")
                return res.status(409).json({ error: 'El usuario ya existe' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = new Usuario({
                correo: req.body.email,
                usuario: req.body.username,
                password: hashedPassword
            })

            const usuarioGuardado = await newUser.save()

            console.log("Usuario creado correctamente");
            const token = jwt.sign({ id: usuarioGuardado._id }, 'secret_key', { expiresIn: '1h' });
            res.status(201).json({ message: 'Usuario creado correctamente', token });

        } catch (error) {
            console.error(error);
        }
    }

    static async login(req, res) {
        console.log("================================== Entro a login en controller de usuario");

        const { email, password } = req.body;
        try {
            const user = await Usuario.findOne({ correo: email });
            console.log('================================\n', user, '================================\n')
            if (!user) {
                console.log("usuario no encontrado");
                return res.status(400).json({ message: 'Usuario o contraseña inválido' });
            }

            const passwordValido = await bcrypt.compare(password, user.password);

            console.log('================================\n', passwordValido, '================================\n')
            if (!passwordValido) {
                console.log("password invalido");
                return res.status(400).json({ message: 'Usuario o contraseña inválido' });
            }

            console.log("todo salio bien");
            console.log(user);

            const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
            res.json({ token });

        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
            return null;
        }
    }

    static googleLogin(req, res) {
        const idToken = req.body.idToken;

        googleClient.verifyIdToken({ idToken }).then(response => {
            const data = response.getPayload();
            console.log(data);
            res.send({ token: 132456 })
        }).catch(err => {
            console.log(err);
            res.status(401).send({ msg: 'Token Invalido' });
        }

        )
    }
}

module.exports = ControladorUsuario;
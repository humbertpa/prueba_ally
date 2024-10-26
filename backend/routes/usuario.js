const router = require('express').Router();
const ControladorUsuario = require('../controllers/usuario');

router.post('/register', ControladorUsuario.registrar);
router.post('/login', ControladorUsuario.login);
router.post('/google', ControladorUsuario.googleLogin);

module.exports=router;


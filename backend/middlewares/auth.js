const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

async function auth(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) return res.status(401).send('Acceso denegado. Token no provisto');
  
    try {
      const decoded = jwt.verify(token, 'secret_key');
      const user = await Usuario.findById(decoded.id);
      if (!user) return res.status(404).send('Usuario no encontrado');
  
      req.user_id = decoded.id

      next();
    } catch (ex) {
      console.error('Error al verificar el token:', ex);
      res.status(400).send('Token inválido');
    }
  }
  
  module.exports = auth;
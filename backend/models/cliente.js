const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
  user_id: { type: String, required: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  contacto: { type: String, required: true },
  organizacion: { type: String, required: true },
  proyecto: { type: String, required: true },
  imagen: { type: String }
});

module.exports = model('Cliente', clientSchema);
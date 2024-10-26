const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    correo: { type: String, required: true, unique: true },
    usuario: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = model('User', userSchema);
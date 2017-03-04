var mongoose = require('mongoose');
var db = mongoose.connection;

// Esquema de Usuario
var UsuarioSchema = mongoose.Schema({
    nombre_padre: { type: String, index: true},
    password: { type: String },
    nombre_alumno: { type: String}
});

var Usuario = module.exports = mongoose.model('Usuario', UsuarioSchema);

module.exports.crearUsuario = function () {

};

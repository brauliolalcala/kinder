var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var sanitizer = require('sanitizer');
var validator = require('validator');
var flash = require('connect-flash');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contacto.ejs', {
        'page': 'contacto',
        'estilos': ['/stylesheets/estilos-contacto.css'],
        'scripts': [],
        'errors': []
    });
});

router.post('/', function(req, res, next) {

    var form = {
        'nombre_padre': sanitizer.escape(req.body.nombre_padre),
        'nombre_alumno': sanitizer.escape(req.body.nombre_alumno),
        'alumno_institucion': sanitizer.escape(req.body.alumno_institucion),
        'email': sanitizer.escape(req.body.email),
        'telefono': sanitizer.escape(req.body.telefono),
        'asunto': sanitizer.escape(req.body.asunto),
        'msg': sanitizer.escape(req.body.mensaje)
    };



    //Validando los elementos enviados
    req.checkBody('nombre_padre', 'Por favor introduzca el nombre del padre o tutor').notEmpty();
    req.checkBody('email', 'Por favor introduzca un correo').notEmpty();
    req.checkBody('email', 'El correo especificado no es válido').isEmail();
    req.checkBody('alumno_institucion', 'Por favor conteste esta pregunta').notEmpty();


    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        console.log("'Indice:'" + errors.indexOf({param: 'alumno_institucion'}));
        res.render('contacto.ejs', {
            errors: errors,
            page: 'contacto',
            estilos: ['/stylesheets/estilos-contacto.css'],
            scripts: []
        });
    } else {
        //Enviando el mandarMensaje
        var mensaje =
            '<h1> El Sr.(a) ' + form.nombre_padre + ' ha llenado el formulario de la página web con los siguientes datos </h1>' + '<br>' + '<h3>Nombre del Tutor:' + form.nombre_padre + '</h3>' + '<b>Nombre del Alumno:' + form.nombre_alumno + '</b>' + '<br>' + 'Su hijo ' + '<b>' + form.alumno_institucion + '</b>' + ' es alumno de nuestra institución.' + '<br>' + 'Correo:' + '<u>' + form.email + '</u>' + '<br>' + 'Teléfono:' + '<b>' + form.telefono + '<b>' + '<br>' + 'Asunto a tratar:' + form.asunto + '<br>' + 'Mensaje:' + form.mensaje;

        var mailOptions = {
            from: '"Braulio Uciel" <bu.alvaradoalcala@gmail.com>', // sender address
            to: 'preecarlos_pellicer@hotmail.com', // list of receivers
            subject: 'URGENTE: CONTESTAR (Página Web)', // Subject line
            html: mensaje // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log("Ocurrió un error".bold().red());
                return console.log(error.bold());
            }
            console.log('Message %s sent: %s'.bold(), info.messageId, info.response);
            res.redirect('/index');
        });

        req.flash('succes', 'Se ha enviado la información proporcionada. Gracias por su preferencia.');
    }

});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        //Cambiar estos datos para mandar correos
        user: 'bu.alvaradoalcala@gmail.com',
        pass: 'uxi_el01'
    }
});

module.exports = router;

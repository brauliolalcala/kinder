'use strict';

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto.ejs', {
    'page': 'contacto',
    'estilos': ['/stylesheets/estilos-contacto.css'],
    'scripts': []
  });
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      //Cambiar estos datos para mandar correos
        user: 'exapmple@gmail.com',
        pass: 'password'
    }
});

router.post('/send', function (req, res, next) {
  let mensaje =
  '<h1> El Sr.(a) '+ req.body.nombre_padre + ' ha llenado el formulario de la página web con los siguientes datos </h1>'
  + '<br>'
  + '<h3>Nombre del Tutor:' + req.body.nombre_padre + '</h3>'
  + '<b>Nombre del Alumno:' + req.body.nombre_alumno + '</b>'
  + '<br>'
  + 'Su hijo ' + '<b>' + req.body.alumno_insitucion + '</b>' +' es alumno de nuestra institución.'
  + '<br>'
  + 'Correo:' + '<u>'+ req.body.email +'</u>'
  + '<br>'
  + 'Teléfono:' + '<b>' + req.body.telefono + '<b>'
  + '<br>'
  + 'Asunto a tratar:' + req.body.asunto
  + '<br>'
  + 'Mensaje:' + req.body.mensaje;

  let mailOptions = {
      from: '"Braulio Uciel" <bu.alvaradoalcala@gmail.com>', // sender address
      to: 'preecarlos_pellicer@hotmail.com', // list of receivers
      subject: 'URGENTE: CONTESTAR (Página Web)', // Subject line
      text: mensaje, // plain text body
      html: mensaje // html body
  };
  // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    });

    res.redirect('/index');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var sanitizer = require('sanitizer');
var validator = require('validator');
var flash = require('connect-flash');


router.get('/', function(req, res, next) {
    res.render('iniciar-sesion.ejs', {
        'page': 'iniciar-sesion',
        'estilos': ['/stylesheets/iniciar-sesion.css'],
        'scripts': [],
        'errors': []
    });
});

module.exports = router;

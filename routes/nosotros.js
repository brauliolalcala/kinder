var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('nosotros.ejs', {
    'page': 'nosotros',
    'estilos': ['/stylesheets/estilos-nosotros.css'],
    'scripts': []
  });
});


module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', {
    'page': 'index',
    'estilos': ['/stylesheets/estilos.css'],
    'scripts': []
  });
});

router.get('/index', function(req, res, next) {
  res.render('index.ejs', {
    'page': 'index',
    'estilos': ['/stylesheets/estilos.css'],
    'scripts': []
  });
});


module.exports = router;

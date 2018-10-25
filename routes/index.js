var express = require('express');
var router = express.Router();
const middlewares = require('../middlewares/middlewares');

/* GET home page. */
router.get('/', middlewares.isLogged, (req, res, next) => {
  res.render('index', { page: 'Home', menuId: 'home' });
});

router.get('/about', (req, res, next) => {
  res.render('about', { page: 'About Us', menuId: 'about' });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { page: 'Contact Us', menuId: 'contact' });
});

router.get('/error', function (req, res, next) {
  res.render('error', { page: 'Ups.. Error', menuId: 'error' });
});

module.exports = router;

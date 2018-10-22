const express = require('express');
const router = express.Router();
const Jam = require('../models/jam');
// const mongoose = require('mongoose');
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

router.get('/', (req, res, next) => {
  Jam.find()
    .then(jams => {
      const data = {
        jams: jams,
        page: 'jams',
        menuId: 'jams'
      };

      res.render('jams/index', data);
    });
});

router.get('/add', (req, res, next) => {
  res.render('jams/add', { page: 'jams', menuId: 'jams' });
});

router.post('/add', (req, res, next) => {
  const newJam = req.body;
  if (!newJam.title || !newJam.date || !newJam.city || !newJam.description || !newJam.style) {
    return res.redirect('/jams/add');
    // res.redirect('signup');
  } else {
    Jam.create(newJam)
      .then(() => {
        return res.redirect('/jams');
      })
      .catch(next);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Jam = require('../models/jam');
// const mongoose = require('mongoose');
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

/* ------------ Jam Index ----------------- */

router.get('/', (req, res, next) => {
  Jam.find()
    .then(jams => {
      const data = {
        jams: jams,
        page: 'jams',
        menuId: 'jams'
      };
      res.render('jams/index', data);
    })
    .catch(next);
});

/* --------- Add a Jam ---------- */

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

/* --------- Delete a Jam ---------- */

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Jam.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/jams');
    })
    .catch(error => {
      console.log('error', error);
      next(error);
    });
});
/* ----------- Edit Jam ------------ */

module.exports = router;

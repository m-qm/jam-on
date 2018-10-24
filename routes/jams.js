const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Jam = require('../models/jam');
const ObjectId = mongoose.Types.ObjectId;
const middlewares = require('../middlewares/middlewares');
// const User = require('../models/user');

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

/* ----------- Atendees Jam ------------ */

router.post('/:id/attendees', (req, res, next) => {
  const jamId = req.params.id;
  const userId = req.session.currentUser._id;
  // console.log(jamId, 'hey');
  // console.log(userId, 'ho');
  Jam.findById(jamId)
    .then(jam => {
      jam.attendees.push(ObjectId(userId));
      jam.save()
        .then((success) => {
          req.flash('success', 'Saved to attendees');
          res.redirect('/jams');
        })
        .catch(next);
    })
    .catch(next);
});

/* ----------- Edit Jam ------------ */

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Jam.findById(id)
    .then(jam => {
      res.render('jams/edit', { jam: jam });
    })
    .catch(error => {
      console.log('error', error);
      next(error);
    });
});

router.post('/:id/save', middlewares.requireUser, (req, res, next) => {
  const id = req.params.id;
  const updateJam = req.body;
  console.log(updateJam);
  console.log(id);

  Jam.findByIdAndUpdate(id, updateJam)
    .then((jam) => {
      console.log('estoy aqui');
      res.redirect('/jams');
    })
    .catch(next);
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const jam = req.body;
  Jam.findByIdandUpdate(id, jam)
    .then(jam => {
      res.redirect('/jams');
    })
    .catch(error => {
      console.log('error', error);
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const jam = req.body;
  Jam.findById(id, jam)
    .then(jam => {
      res.render('jams/jaminfo', { jam: jam });
    })
    .catch(error => {
      console.log('error', error);
      next(error);
    });
});

/* ----------- Favorite Jam ------------ */

router.post('/:id/favorites', middlewares.requireUser, (req, res, next) => {
  const jamId = req.params.id;
  const userId = req.session.currentUser._id;

  Jam.findbyId(userId)
    .then(user => {
      user.favorites.push(ObjectId(jamId));
      user.save()
        .then((success) => {
          req.flash('info', 'Añadido correctamente');
          res.redirect('/jams');
        })
        .catch(next);
    })
    .catch(next);
});

/* --------- Delete a Jam ---------- */

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Jam.findByIdAndDelete(id)
    .then(() => {
      req.flash('info', 'Borrado correctamente');

      res.redirect('/jams');
    })
    .catch(error => {
      console.log('error', error);
      next(error);
    });
});

module.exports = router;

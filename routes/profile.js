const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const mongoose = require('mongoose');
const User = require('../models/user');
const Jams = require('../models/jam');
// const ObjectId = require('mongose').ObjectId;
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

router.get('/', middlewares.requireUser, (req, res, next) => {
  const id = req.session.currentUser._id;
  var idObj = mongoose.Types.ObjectId(id);
  User.findById(id)
    .then(user => {
      Jams.find({ attendees: idObj })
        .then((results) => {
          if (!results) {
            console.log(results);
            return res.render('profile', { user: user });
          } else {
            const data = {
              user,
              jams: results
            };
            console.log('hay usuario y jam', results);
            return res.render('profile', data);
          }
        });
    })
    .catch(next);
});

router.get('/edit', middlewares.requireUser, (req, res, next) => {
  User.findById(res.locals.currentUser._id)
    .then((user) => {
      res.render('profileedit', { user: user });
    });
});

router.post('/save', middlewares.requireUser, (req, res, next) => {
  const updateUser = req.body;
  const id = req.session.currentUser._id;

  User.findByIdAndUpdate(id, updateUser)
    .then((user) => {
      req.flash('success', 'Profile edited');
      res.redirect('/profile');
    })
    .catch(next);
});

module.exports = router;

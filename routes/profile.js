const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const mongoose = require('mongoose');
const User = require('../models/user');
// const ObjectId = require('mongose').ObjectId;
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

router.get('/', middlewares.requireUser, (req, res, next) => {
  const { _id } = req.session.currentUser;
  User.findById(_id)
    .then(user => {
      console.log(user);
      res.render('profile', { user: user });
    })
    .catch(next);
});

router.get('/edit', middlewares.requireUser, (req, res, next) => {
  User.findById(res.locals.currentUser._id)
    .then((user) => {
      console.log(user);
      res.render('profileedit', { user: user });
    });
});

router.post('/save', middlewares.requireUser, (req, res, next) => {
  const updateUser = req.body;
  const id = req.session.currentUser._id;
  console.log(updateUser);
  console.log(id);

  User.findByIdAndUpdate(id, updateUser)
    .then((user) => {
      res.redirect('/profile');
    })
    .catch(next);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const mongoose = require('mongoose');
const User = require('../models/user');
// const ObjectId = require('mongose').ObjectId;
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

router.get('/', middlewares.requireUser, (req, res, next) => {
  console.log('HOLAAAAAAAA');
  console.log(res.locals.currentUser);
  res.render('profile');
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
  const id = res.locals.currentUser._id;
  console.log(res);
  console.log(updateUser);
  console.log(id);

  User.findByIdAndUpdate(id, updateUser)
    .then((user) => {
      res.render('profile', { user: user });
    })
    .catch(next);
});

module.exports = router;

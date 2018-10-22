const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.password) {
    res.redirect('signup');
  }
  User.findOne({ username: newUser.username })
    .then((user) => {
      if (user) {
        res.render('signup');
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
        const registerUser = {
          username: newUser.username,
          password: hashedPassword
        };
        User.create(registerUser)
          .then(() => {
            res.redirect('profile'); // cambiar nombre de ruta y vista
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

module.exports = router;

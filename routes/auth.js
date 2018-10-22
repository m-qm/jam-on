const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/user');
const middlewares = require('../middlewares/middlewares');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.render('signup', { page: 'Sign up', menuId: 'signup' });
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
            console.log('create', user);
            res.redirect('/profile'); // cambiar nombre de ruta y vista
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.get('/login', middlewares.requireAnon, (req, res, next) => {
  res.render('login', { page: 'Login', menuId: 'login' });
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.redirect('login');
  }
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        console.log('Invalid user or password');
        console.log('mensaje 1', user);
        return res.redirect('login');
      } else {
        if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
        // Save the login in the session!
          req.session.currentUser = user;
          console.log(user);
          return res.redirect('/profile');
        } else {
          res.redirect('/auth/login');
        }
      }
    })
    .catch(next);
});

module.exports = router;

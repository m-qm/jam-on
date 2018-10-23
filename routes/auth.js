const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/user');
const middlewares = require('../middlewares/middlewares');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/signup', middlewares.requireAnon, (req, res, next) => {
  res.render('signup', { page: 'Sign up', menuId: 'signup' });
});

router.post('/signup', (req, res, next) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.password) {
    // console.log('usuario o contraseña esta en blanco');
    req.flash('error', 'Username or password cannot be empty');
    return res.redirect('signup');
    // res.redirect('signup');
  }
  User.findOne({ username: newUser.username })
    .then((user) => {
      if (user) {
        console.log('usuario existe');
        req.flash('error', 'Username already taken');
        return res.redirect('signup');
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
        const registerUser = {
          username: newUser.username,
          password: hashedPassword
          // email: newUser.email,
          // city: newUser.city,
          // instrument: newUser.instrument,
          // style: newUser.style,
          // about: newUser.about

        };
        User.create(registerUser)
          .then((result) => {
            req.session.currentUser = result;
            req.flash('success', 'Correct Signup');
            return res.redirect(`/profile/`); // cambiar nombre de ruta y vista
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
    req.flash('error', 'Username or password cannot be empty');
    return res.redirect('login');
  }
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Username or password are not correct');
        return res.redirect('login');
      } else {
        if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
          // Save the login in the session!
          req.session.currentUser = user;
          req.flash('success', 'Correct Login');
          return res.redirect('/profile');
        } else {
          req.flash('error', 'Username or password are not correct');
          res.redirect('/auth/login');
        }
      }
    })
    .catch(next);
});

router.post('/logout', middlewares.requireUser, (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});
module.exports = router;

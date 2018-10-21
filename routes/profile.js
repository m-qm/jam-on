const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
// const mongoose = require('mongoose');
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

router.get('/', middlewares.requireAnon, (req, res, next) => {
  res.render('profile');
});

module.exports = router;

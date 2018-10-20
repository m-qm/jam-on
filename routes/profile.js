const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

module.exports = router;

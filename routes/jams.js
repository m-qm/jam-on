const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

router.get('/', (req, res, next) => {
  res.render('jams/jamindex');
});

module.exports = router;

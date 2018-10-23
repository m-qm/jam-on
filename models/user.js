const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  description: String,
  style: String,
  date: Date
});

const User = mongoose.model('User', userSchema);
module.exports = User;
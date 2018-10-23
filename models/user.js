const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  city: String,
  instrument: String,
  styles: String,
  about: String,
  playlist: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;

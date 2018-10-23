const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const JamSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  title: String,
  date: Date,
  city: String,
  description: String,
  style: String,
  instruments: String,
  attendees: [{
    type: ObjectId,
    ref: 'User'
  }]
});

const Jam = mongoose.model('jam', JamSchema);
module.exports = Jam;

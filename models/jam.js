const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const jamSchema = new Schema({
  owner: [{
    type: ObjectId,
    ref: 'User'
  }],
  name: String,
  city: String,
  description: String,
  style: {
    type: Array
  },
  date: Date
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

const Jam = mongoose.model('Jam', jamSchema);

module.exports = Jam;

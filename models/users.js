const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema (
	{
		name: String,
		password: String,
        email: String,
		description: String,
		style: {Array},
		date: Date,
        attendees: 
	}
)

const Jam = mongoose.model('User', userSchema);

module.exports = Jam;
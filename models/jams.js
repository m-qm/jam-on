const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jamSchema = new Schema (
	{
		owner: ObjectId<User>
		name: String,
		city: String,
		description: String,
		style: {
			type: Array
  },
		date: {
    timestamps : {
        createdAt : "created_at",
        updatedAt : "updated_at"
    }
	}
)

const Jam = mongoose.model('Jam', jamSchema);

module.exports = ('jam')
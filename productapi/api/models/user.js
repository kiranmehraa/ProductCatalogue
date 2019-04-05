const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//Creating the product schema

const UserSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	username: {type: String, required : true},
	password : {type: String, required : true}
});

// Exporting the schema as a model
module.exports = mongoose.model('User', UserSchema);
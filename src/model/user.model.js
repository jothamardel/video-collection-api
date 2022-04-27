const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	bank_name: {
		type: String,
		required: true
	},
	account_name: {
		type: String,
		required: true
	},
	account_number: {
		type: String,
		required: true,
		unique: true
	},
	phone: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
}, { timestamps: true });

module.exports = mongoose.model('UserVehicleCollection', userSchema);

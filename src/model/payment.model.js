const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	total_videos_paid: {
		type: Number,
		required: true
	},
	unpaid_videos: {
		type: Number,
		required: true
	},
	total_videos: {
		type: Number,
		required: true
	}

}, { timestamps: true });

module.exports = mongoose.model('VideoPayment', paymentSchema);

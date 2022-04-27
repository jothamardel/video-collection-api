const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	video_url: {
		type: String,
		required: true
	},
	car_brand: {
		type: String,
		required: true
	},
	car_model: {
		type: String,
		required: true
	},
	mobile_brand: {
		type: String,
		required: true
	},
	damaged: {
		type: Boolean,
		required: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);

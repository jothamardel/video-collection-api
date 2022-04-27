const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://support:skill123abc@skillseeds.gyfld.mongodb.net/employer-center?retryWrites=true&w=majority';

const MONGO_LOCAL_URL = 'mongodb+srv://support:skill123abc@skillseeds.gyfld.mongodb.net/employer-center?retryWrites=true&w=majority'
// const MONGO_LOCAL_URL = 'mongodb://127.0.0.1:27017/nasa'


mongoose.connection.once('open', () => {
	console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
	console.error(err);
});


async function mongoConnect() {
	await mongoose.connect(MONGO_LOCAL_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
}

async function mongoDisconnect() {
	await mongoose.disconnect();
}

module.exports = {
	mongoConnect,
	mongoDisconnect
};
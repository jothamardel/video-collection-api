const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { httpCreateUserAccount, httpUserLogin } = require('./controllers/user.controller');
const { httpSaveVideo, httpGetUserUpload } = require('./controllers/video.controller');


app.use(cors({
	origin: 'https://intense-eyrie-93047.herokuapp.com',
}));

app.use(morgan('combined'));


app.use(express.json());


app.post('/register', async (req, res) => {
	await httpCreateUserAccount(req, res);
})

app.post('/login', async (req, res) => {
	await httpUserLogin(req, res);
})

app.post('/upload', async (req, res) => {
	await httpSaveVideo(req, res);
})

app.get('/upload/:id', async (req, res) => {
	await httpGetUserUpload(req, res);
})

// app.use(express.static(process.cwd() + '/public'));


// app.get('/*', (req, res) => {
// 	console.log("Requesting resource....");
// 	res.sendFile(process.cwd() + '/public');
// });

module.exports = app;
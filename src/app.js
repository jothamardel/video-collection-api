const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { httpCreateUserAccount, httpUserLogin, httpGetAllUsers, httpGetSingleUser } = require('./controllers/user.controller');
const { httpSaveVideo, httpGetUserUpload, httpGetAllUpload } = require('./controllers/video.controller');


// app.use(cors({
// 	origin: 'https://video-collection-fe.vercel.app',
// }));

app.use(cors());

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

app.get('/upload/all', async (req, res) => {
	await httpGetAllUpload(req, res);
})

app.get('/upload/:id', async (req, res) => {
	await httpGetUserUpload(req, res);
})

app.get('/users', async (req, res) => {
	await httpGetAllUsers(req, res);
})

app.get('/user/:id', async (req, res) => {
	await httpGetSingleUser(req, res);
})

// app.use(express.static(process.cwd() + '/public'));


// app.get('/*', (req, res) => {
// 	console.log("Requesting resource....");
// 	res.sendFile(process.cwd() + '/public');
// });

module.exports = app;
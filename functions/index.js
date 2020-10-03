const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));



const { 
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail
} = require('./API/users')

const auth = require('./util/auth');

const {getImage} = require('./API/images')

app.post('/login', loginUser)
app.post('/signUp', signUpUser)
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);

app.get('/getImage/:path', getImage)

exports.api = functions.https.onRequest(app)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

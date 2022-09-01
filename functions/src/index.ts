import * as functions from "firebase-functions";
const admin = require("firebase-admin");
import express from 'express';
const bodyParser = require('body-parser');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

admin.initializeApp(functions.config().admin);


const register = require('./pages/register');
app.use('/register', register);


app.get("/events", (req, res) => {
	res.send("Hi Democrasee!!!!");
});
app.get("/event", (req, res) => {
	res.send("Hi Democrasee!!!!");
});
app.get("/date", (req, res) => {
	res.send("Hi Democrasee!!!!");
});
app.get("/profile", (req, res) => {
	res.send("Hi Democrasee!!!!");
});


exports.app = functions.https.onRequest(app);



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


const events = require('./api/events');
app.use('/v1/events', events);

const search = require('./api/search');
app.use('/v1/search', search);




// old code:

const pregister = require('./pages/register');
app.use('/api/register', pregister);

const pevents = require('./pages/events');
app.use('/api/events', pevents);

// end od co





exports.app = functions.https.onRequest(app);



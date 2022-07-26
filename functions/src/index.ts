import * as functions from "firebase-functions";
const admin = require("firebase-admin");
import express from 'express';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const app = express();
exports.app = functions.https.onRequest(app);

app.get("/home", (req, res) => {
	res.send("Hi Democrasee!!!!");
});

admin.initializeApp(functions.config().admin);
import * as functions from "firebase-functions";
import express from 'express';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const app = express();


app.get("/login", (req, res) => {
	res.send("Hi Democrasee!!!!");
});
app.get("/register", (req, res) => {
	res.send("Hi Democrasee!!!!");
});
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



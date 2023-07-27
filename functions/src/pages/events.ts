import * as functions from "firebase-functions";
const admin = require("firebase-admin");
import express from 'express';
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


admin.initializeApp(functions.config().admin,'events');
const db = admin.firestore();

app.post('/', async (req, res) => {

	console.log('trying to get events')

	try {
	
    let tempCollection : any = [];

    const eventsRef = db.collection('events');
				const events = await eventsRef.get();
				events.forEach(event => {
				  console.log(event.id, '=>', event.data());
				  tempCollection.push({
     			 	eventId: event.id,
     			 	eventData:  event.data(),
     			 });
				});


    	res.send({
    		response: tempCollection
    	})
	} catch (error) {
    	console.log('something went wrong ' + error);
    	res.send({
    		error: error
    	})
  	}

});


module.exports = app;

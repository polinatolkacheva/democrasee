import * as functions from "firebase-functions";
const admin = require("firebase-admin");
import express from 'express';
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


admin.initializeApp(functions.config().admin,'events');
const db = admin.firestore();

// add middleware at some point to check if it's a public general access, or user token id

app.post('/', async (req, res) => {

	console.log('trying to get events')

	try {

		// accept parameters, such as: only upcoming, past, live, (all statuses)
		 
		// date range
		// location: zip, city, state or coordinate radius based on address

	// start with status input

	
    let eventsCollection : any = [];

    const eventsRef = db.collection('events');
				const events = await eventsRef.get();
				events.forEach(event => {
				  console.log(event.id, '=>', event.data());
				  eventsCollection.push({
     			 	eventId: event.id,
     			 	eventData:  event.data(),
     			 });
				});


    	res.send({
    		response: eventsCollection
    	})
	} catch (error) {
    	console.log('something went wrong ' + error);
    	res.send({
    		error: error
    	})
  	}

});


module.exports = app;

import * as functions from "firebase-functions";
const admin = require("firebase-admin");
import express from 'express';
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


admin.initializeApp(functions.config().admin,'search');
const db = admin.firestore();

app.post('/', async (req, res) => {

	console.log('trying to get events > dates based on searched parameters')
	try {

		// accept parameters, such as: only upcoming, past, live, (all statuses)
		 
		// date range

		// location: zip, city, state or coordinate radius based on address

		// start with status input

		
	    let datesCollection : any = [];
	    let eventsCollection : any = [];

	    let datesRef = db.collection('dates');

	    if(req.body.status){
	    	datesRef = datesRef.where("status","==",req.body.status);
	    }

		const dates = await datesRef.get();
		dates.forEach(date => {
		  console.log(date.id, '=>', date.data());
		  datesCollection.push({
			 	dateId: date.id,
			 	dateData:  date.data(),
			 });
		});

		// for each date in collection - look up it's event id:
		for (let dateCollection of datesCollection) {
		    console.log(dateCollection.dateData.events[0].id);

		    const eventsRef = db.collection('events').doc(dateCollection.dateData.events[0].id);
			const events = await eventsRef.get();
			if (!events.exists) {
			  console.log('No such document!');
			} else {
			  console.log(events.id, '=>', events.data());
			  eventsCollection.push({
				 	dateId: dateCollection.dateId,
				 	dateData:  dateCollection.dateData,
				 	eventData: events.data()
				 });
			}
		}


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

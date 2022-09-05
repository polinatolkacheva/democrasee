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

	console.log('trying to get event dates')

	try {
	
    let tempCollection : any = [];

            const datesRef = db.collection('dates').where('status', '==', 'upcoming');
				const snapshot = await datesRef.get();
				snapshot.forEach(doc => {
				  console.log(doc.id, '=>', doc.data());

     			 tempCollection.push(doc.data());
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

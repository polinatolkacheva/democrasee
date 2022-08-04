import * as functions from "firebase-functions";
const admin = require("firebase-admin");
import express from 'express';
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


admin.initializeApp(functions.config().admin,'register');
//const db = admin.firestore();

app.post('/', async (req, res) => {

	console.log('trying to register '+req.body.email);

	try {
	    const user = await admin.auth().createUser({
	      email: req.body.email,
	      emailVerified: true,
	      password: '123456',
	      displayName: req.body.firstName,
	      disabled: false,
	    });

	    console.log('user created: '+JSON.stringify(user));

	    //add the user to the database
	    return {
	      response: user
	    };
    	res.send({
    		response: user
    	})
	} catch (error) {
    	console.log('something went wrong ' + error);
    	res.send({
    		error: error
    	})
    	return{
    		error: error
    	}
  	}

});


module.exports = app;

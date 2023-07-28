import * as functions from "firebase-functions";
const admin = require("firebase-admin");
import express from 'express';
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


admin.initializeApp(functions.config().admin,'pregister');
const db = admin.firestore();

app.post('/', async (req, res) => {

	console.log('trying to register '+req.body.email);

	try {
		function makeid(length) {
			    var result           = '';
			    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			    var charactersLength = characters.length;
			    for ( var i = 0; i < length; i++ ) {
			      result += characters.charAt(Math.floor(Math.random() * 
			 charactersLength));
			   }
			   return result;
			}

		// register user with firebase auth:
	    const user = await admin.auth().createUser({
	      email: req.body.email,
	      emailVerified: true,
	      password: makeid(7),
	      displayName: req.body.firstName,
	      disabled: false,
	    });

	    console.log('user created: '+JSON.stringify(user));

		// create user in database in users collection:
         db.collection("users").doc(user.uid).set({
         		email: req.body.email,
         		firstName: req.body.firstName,
         		lastName: req.body.lastName,
         		location: req.body.location
            }, { merge: true })
             .then(() => {
               console.log("user doc created for "+user.uid+' email '+req.body.email);
            }).catch((error) => {
               console.error("Error writing user to users: ", error);
            });

		// send welcome email :)
       	db.collection("mail").add({
		      to: [req.body.email],
		      template: {
		        name: 'welcomeEmail',
		        data: {
		          firstName: req.body.firstName
		        }
		      },
		    }).then(() => {
		         console.log("welcome email sent to "+req.body.firstName +' '+ req.body.email);
		      })
		      .catch((error) => {
		          console.error("Error writing mail document: ", error);
		      });;


    	res.send({
    		response: user.uid
    	})
	    return {
	      response: user.uid
	    };
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

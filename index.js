import {initializeApp, applicationDefault} from 'firebase-admin/app';
import {getMessaging} from "firebase-admin/messaging";
import express, {json} from "express";

// var serviceAccount = require("path/to/serviceAccountKey.json");

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());




app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});



initializeApp({
    credential: applicationDefault(),
    projectId:'fcmnode-f0931'
});


app.post('/send', function(req, res,next) {
    const receivedToken = req.body.fcmToken;   // Shreyas : Must change here for number of devices
    const message = {
        notification:{
            title : "Nofif",
            body: 'This is a test notification'
        },
        token : receivedToken
    };

    getMessaging()
        .send(message)
        .then((response) => {
            res.status(200).json({
                message:"Message sent successfully",
                token: receivedToken
            });
            console.log("Successfully send message : ",response)
        })
        .catch((error) => {
            res.status(400);
            res.send(error);
            console.log("Error sending message : ",error);
        });




});

app.listen(3000,function(){
    console.log("Started listening on port 3000");
});

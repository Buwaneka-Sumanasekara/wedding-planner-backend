import * as functions from 'firebase-functions'
import * as express from 'express';
import * as cors from "cors";


import  GuestRouter from './guests';
import  CommonRouter from './common';
import  InvitationRouter from './invitations';





const app = express();
app.use(cors());

app.use('/guests',GuestRouter);
app.use('/common',CommonRouter);
app.use('/invitation',InvitationRouter);


const main = express();



main.use('/api/v1', app);
//main.use(bodyParser.json());
//main.use(bodyParser.urlencoded({ extended: false }));
export const webApi = functions.https.onRequest(main);
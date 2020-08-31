import * as functions from 'firebase-functions'
import * as express from 'express';
//import * as bodyParser from "body-parser";
import * as cors from "cors";


import * as testApi from './test';





const app = express();
app.use(cors());
app.get('/test', testApi.testAPIFun);
app.post('/guests/import',testApi.importGuests);


const main = express();



main.use('/api/v1', app);
//main.use(bodyParser.json());
//main.use(bodyParser.urlencoded({ extended: false }));
export const webApi = functions.https.onRequest(main);
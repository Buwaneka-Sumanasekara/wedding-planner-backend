import { Response,Request } from "express";
import GuestController from "../controllers/guestController";
// const data = require("../data/data.json");
import * as admin from 'firebase-admin';


export async function testAPIFun(req: Request, res: Response) {
    const result = GuestController.importGuests();
    res.status(200).send({ "msg": result });
}

export async function importGuests(req: any, res: Response) {
    try {
        const allguests=req.body;
        allguests.forEach((docKey:any,i:number) => {
            if(docKey!==""){
                
                admin.firestore().collection("guests").doc(`${i}`).set(docKey).then((res:any) => {
                    console.log("Document " + docKey + " successfully written!",res);
                }).catch((error:Error) => {
                   console.error("Error writing document: ", error);
                });
            }
           
        });
        res.status(200).send({ "msg": allguests}); 
    } catch (error) {
        res.status(500).send({ "msg": error.message}); 
    }
}
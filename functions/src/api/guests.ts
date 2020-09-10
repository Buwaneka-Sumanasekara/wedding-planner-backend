/*
 * File: guests.ts
 * File Created: Wednesday, 2nd September 2020 2:29:53 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Wednesday, 2nd September 2020 2:29:54 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import { Router,Response,Request } from "express";
import GuestController from "../controllers/guestController";
import {GuessFilter,ResponseAPI} from "../models";


const GuestRouter = Router();

GuestRouter.post("/",(req:Request,res:Response)=>{
    try {
        const filter:GuessFilter=req.body;
        return GuestController.getGuests(filter).then(result=>{
            const response_obj:ResponseAPI={
                "status":true,
                "message":"success",
                "resultCount":result.length,
                "data":result
            }
            return res.status(200).send(response_obj); 
        }).catch(error=>{
            return res.status(500).send(error.message); 
        })

        
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
})
.post("/import",(req:Request,res:Response)=>{
    try {
       
       return GuestController.importGuests(req.body).then(message=>{
            const response_obj:ResponseAPI={
                "status":true,
                "message":message
            }
            return res.status(200).send(response_obj); 
        }).catch(err=>{
            return res.status(500).send(err.message);
        })
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
})
GuestRouter.get("/:guestId",(req:Request,res:Response)=>{
    try {
        const GuestId:string=req.params.guestId;
        return GuestController.getGuestById(GuestId).then(result=>{
            const response_obj:ResponseAPI={
                "status":true,
                "message":"success",
                "data":result
            }
            return res.status(200).send(response_obj); 
        }).catch(error=>{
            return res.status(500).send(error.message); 
        })

        
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
})

export default GuestRouter;
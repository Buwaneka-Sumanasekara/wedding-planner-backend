/*
 * File: invitations.ts
 * File Created: Thursday, 3rd September 2020 3:45:59 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Thursday, 3rd September 2020 3:45:59 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import { Router,Response,Request } from "express";
import InvitationController from "../controllers/invitationController";
import {ResponseAPI,NewInvitation,Invitation} from "../models";



const InvitationRouter = Router();
InvitationRouter.route("/").post((req:Request,res:Response)=>{
    try {
        
        const new_invitation:NewInvitation=req.body;
        if(new_invitation.guestId!==undefined && new_invitation.guestId!==""){
            return InvitationController.createInvitationLink(new_invitation).then(result=>{
                const response_obj:ResponseAPI={
                    "status":true,
                    "message":"success",
                    "data":result
                }
                return res.status(200).send(response_obj); 
            }).catch(error=>{
                return res.status(500).send(error.message); 
            })
        }else{
            throw new Error("Guest Id required")
        }
        
    } catch (error) {
        return res.status(500).send(error.message); 
    }
})

InvitationRouter.route("/:InvId")
.get((req:Request,res:Response)=>{
    try {
        const InvId:string=req.params.InvId;
        return InvitationController.getInvitationDetails(InvId).then(result=>{
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
}).post((req:Request,res:Response)=>{
    try {
        const InvId:string=req.params.InvId;
        const invitation:Invitation=req.body;
        invitation.refCode=InvId;
        return InvitationController.acceptedDeclineInvitation(invitation).then(result=>{
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

export default InvitationRouter;
/*
 * File: common.ts
 * File Created: Wednesday, 2nd September 2020 4:10:39 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Wednesday, 2nd September 2020 4:10:40 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import { Router,Response,Request } from "express";
import CommonController from "../controllers/commonController";
import {ResponseAPI} from "../models";


const CommonRouter = Router();

CommonRouter.get("/filters",(req:Request,res:Response)=>{
    try {
        const result=CommonController.getAllFilters();
        const response_obj:ResponseAPI={
            "status":true,
            "message":"success",
            "resultCount":result.length,
            "data":result,
           
        }
        return res.status(200).send(response_obj); 
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
})


export default CommonRouter;
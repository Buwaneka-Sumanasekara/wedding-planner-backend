import { Request,Response } from "express";



export async function testAPIFun(req:Request, res:Response) {
    const userId = req.headers["user_id"];
    res.status(200).send({ 'msg': "wade goda  ss",user_id:userId });
}
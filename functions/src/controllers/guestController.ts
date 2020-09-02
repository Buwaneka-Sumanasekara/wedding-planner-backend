/*
 * File: guestController.ts
 * File Created: Monday, 31st August 2020 5:26:52 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Monday, 31st August 2020 5:26:52 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import * as admin from 'firebase-admin';
import {GuessFilter,GuestModel} from "../models";

const getGuests = async(filter:GuessFilter) => {
    const query=admin.firestore().collection("guests")

    if(filter.inviteMode!==undefined){
        query.where("inviteMode","in",filter.inviteMode)
    }if(filter.side!==""){
        query.where("side","==",filter.side)
    }if(filter.tag1!==undefined){
        query.where("tag1","in",filter.tag1)
    }if(filter.tag2!==undefined){
        query.where("tag2","in",filter.tag2)
    }if(filter.tag3!==undefined){
        query.where("tag3","in",filter.tag3)
    }

    
    return query.get();
} 

const importGuests = (allguests:[]) => {
    try {
        allguests.forEach(async(docval:any,i:number) => {
            if(docval!==""){
                const id=(i+1);

                const tags=[];
                if(docval["Tag1"]!==""){
                    tags.push(docval["Tag1"]);
                }if(docval["Tag2"]!==""){
                    tags.push(docval["Tag2"]);
                }if(docval["Tag3"]!==""){
                    tags.push(docval["Tag3"]);
                }

                const guest:GuestModel={
                    "id":`${docval["Side"]}${id}`,
                    "name":docval["NameOnCard"],
                    "nickName":docval["RefName"],
                    "inviteMode":docval["InviteMode"],
                    "side":docval["Side"],
                    "seats":docval["Seats"],
                    "contact1":docval["Contact1"],
                    "constact2":docval["Contact2"],
                    "tableNo":(docval["TABEL"]===""?0:parseInt(docval["TABEL"])),
                    "tag1":docval["Tag1"],
                    "tag2":docval["Tag2"],
                    "tag3":docval["Tag3"],
                }

                await admin.firestore().collection("guests").doc(guest.id).set(guest);
               
            }  
            return docval;
        });
        return `Saved  ${allguests.length} records`;
    } catch (error) {
        throw error;
    }
};




export default{
    importGuests,
    getGuests
}
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
import { GuessFilter, GuestModel } from "../models";


const getGuestById = async (GuestId:string) => {
    try {
        const ref = admin.firestore().collection("guests")
        let query: admin.firestore.Query<admin.firestore.DocumentData> = ref;
        query=query.where("id","==",GuestId)
        return query.orderBy("name").limit(1).get().then(snap=>{
            const result:Array<any>=[];
            if(snap!==undefined && !snap.empty){
                snap.forEach(doc => result.push(doc.data()))
            }
            
            if(result.length>0){
                return result[0]
            }else{
                throw new Error("Guest not found");
            }
        }).catch(err=>{
            throw err;
        })
    } catch (error) {
            throw error; 
    }

}

const getGuests = async (filter: GuessFilter) => {
    try {
        console.log("called",filter)
        const ref = admin.firestore().collection("guests")

        let query: admin.firestore.Query<admin.firestore.DocumentData> = ref;

        if (filter.inviteMode !== undefined && filter.inviteMode!=="") {
            query = query.where("inviteMode", "==", filter.inviteMode)
        } if (filter.side!==undefined && filter.side !== "") {
            query = query.where("side", "==", filter.side)
        } if (filter.tag1 !== undefined && filter.tag1!=="") {
            query = query.where("tag1","==", filter.tag1)
        } if (filter.tag2 !== undefined && filter.tag2!=="") {
            query = query.where("tag2", "==", filter.tag2)
        } if (filter.tag3 !== undefined && filter.tag3!=="") {
            query = query.where("tag3", "==", filter.tag3)
        }if (filter.name !== undefined && filter.name!=="") {
            console.log("name",filter.name)
            query = query.where('keywords1',"array-contains",filter.name.toLowerCase())
        }if (filter.tableNo !== undefined && filter.tableNo>0) {
            query = query.where('tableNo',"==",filter.tableNo)
        }
        query=query.orderBy("name")

        if(filter.limit !==undefined){
            query=query.limit(filter.limit)
        }

        return query.get().then(snap=>{
            const result:Array<any>=[];
            if(snap!==undefined && !snap.empty){
                snap.forEach(doc => result.push(doc.data()))
            }
            return result;
        }).catch(err=>{
            throw err;
        })
       
    } catch (error) {
        throw error;
    }


}



const createKeyWords = (name:string) => {
    const updatedname=name.toLowerCase();
    const arrName:Array<any>= [];
    let curName = "";
    updatedname.split('').forEach((letter)=>{
        curName += letter;
        arrName.push(curName);
    });
    return arrName;
}

const importGuests = (allguests: []) => {
    try {
        allguests.forEach(async (docval: any, i: number) => {
            if (docval !== "") {
                const id = (i + 1);
                const guestId=`${docval["Side"]}${id}`;
                const guest: GuestModel = {
                    "id": guestId,
                    "name": docval["NameOnCard"],
                    "nickName": docval["RefName"],
                    "inviteMode": docval["InviteMode"],
                    "side": docval["Side"],
                    "seats": docval["Seats"],
                    "contact1": docval["Contact1"],
                    "constact2": docval["Contact2"],
                    "tableNo": (docval["TABEL"] === "" ? 0 : parseInt(docval["TABEL"])),
                    "tag1": docval["Tag1"],
                    "tag2": docval["Tag2"],
                    "tag3": docval["Tag3"],
                    "keywords1":createKeyWords(docval["NameOnCard"]),
                    "refCode":Buffer.from(`${guestId}`).toString('base64'),
                    "linkGenerated":false
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




export default {
    importGuests,
    getGuests,
    getGuestById
}
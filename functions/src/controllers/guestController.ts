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
import { GuestFilter, GuestModel,GuestUpdate} from "../models";
import  Utills from "../utils";

const getGuestById = async (GuestId: string) => {
    try {
        const ref = admin.firestore().collection("guests")
        let query: admin.firestore.Query<admin.firestore.DocumentData> = ref;
        query = query.where("id", "==", GuestId)
        return query.orderBy("name").limit(1).get().then(snap => {
            const result: Array<any> = [];
            if (snap !== undefined && !snap.empty) {
                snap.forEach(doc => result.push(doc.data()))
            }

            if (result.length > 0) {
                return result[0]
            } else {
                throw new Error("Guest not found");
            }
        }).catch(err => {
            throw err;
        })
    } catch (error) {
        throw error;
    }
}

const updateGuestById = async (GuestId: string,guest:GuestUpdate) => {
    try {
        const guestId =GuestId;

        const guestRef=admin.firestore().collection("guests").doc(guestId);
        const updateGuest=Utills.removeUndefinedProps(guest);
        return guestRef.update(updateGuest).then(res=>{
            return updateGuest;
        }).catch(err=>{
            throw err;
        })
    } catch (error) {
        throw error;
    }
}



const getGuests = async (filter: GuestFilter) => {
    try {
        console.log("called", filter)
        const ref = admin.firestore().collection("guests")

        let query: admin.firestore.Query<admin.firestore.DocumentData> = ref;

        if (filter.inviteMode !== undefined && filter.inviteMode !== "") {
            query = query.where("inviteMode", "==", filter.inviteMode)
        } if (filter.side !== undefined && filter.side !== "") {
            query = query.where("side", "==", filter.side)
        } if (filter.tag1 !== undefined && filter.tag1 !== "") {
            query = query.where("tag1", "==", filter.tag1)
        } if (filter.tag2 !== undefined && filter.tag2 !== "") {
            query = query.where("tag2", "==", filter.tag2)
        } if (filter.tag3 !== undefined && filter.tag3 !== "") {
            query = query.where("tag3", "==", filter.tag3)
        } if (filter.name !== undefined && filter.name !== "") {
            console.log("name", filter.name)
            query = query.where('keywords1', "array-contains", filter.name.toLowerCase())
        } if (filter.tableNo !== undefined && filter.tableNo > 0) {
            query = query.where('tableNo', "==", filter.tableNo)
        }
        query = query.orderBy("name")

        if (filter.limit !== undefined) {
            query = query.limit(filter.limit)
        }

        return query.get().then(snap => {
            const result: Array<any> = [];
            if (snap !== undefined && !snap.empty) {
                snap.forEach(doc => result.push(doc.data()))
            }
            return result;
        }).catch(err => {
            throw err;
        })

    } catch (error) {
        throw error;
    }


}



const createKeyWords = (name: string) => {
    const updatedname = name.toLowerCase();
    const arrName: Array<any> = [];
    let curName = "";
    updatedname.split('').forEach((letter) => {
        curName += letter;
        arrName.push(curName);
    });
    return arrName;
}

const importGuests = async(allguests: []) => {
    try {
        
        const batch = admin.firestore().batch();


        let saved=0;
        allguests.forEach(async (docval: any, i: number) => {
            if (docval !== "") {
                //const id = (i + 1);
                //const guestId = `${docval["Side"]}${id}`;
                const guestId = `${docval["ID"]}`;
                const guest: GuestModel = {
                    "id": guestId,
                    "name": docval["NameOnCard"],
                    "nickName": docval["RefName"],
                    "inviteMode": docval["InviteMode"],
                    "side": docval["Side"],
                    "seats": docval["Seats"],
                    "expectSeats": docval["ExpectSeats"],
                    "contact1": docval["Contact1"],
                    "contact2": docval["Contact2"],
                    "address":docval["Address"],
                    "tableNo": docval["TABEL"],
                    "tag1": docval["Tag1"],
                    "tag2": docval["Tag2"],
                    "tag3": docval["Tag3"],
                    "keywords1": createKeyWords(docval["NameOnCard"]),
                    "refCode": Buffer.from(`${guestId}`).toString('base64'),
                    "linkGenerated":false,
                    "attendedCount":0,
                    "invited":false
                }
                const guestRef=admin.firestore().collection("guests").doc(guestId);
                await guestRef.set(guest);
                saved++;
            } 
        });
        await batch.commit();
      
       return `Saved  ${allguests.length} records, ${saved} saved`;
    } catch (error) {
        throw error;
    }
};

const updateGuestsList = async (allguests=[]) => {
    try {
        const batch = admin.firestore().batch();
        let saved=0;
        allguests.forEach(async (docval: any, i: number) => {
            if (docval !== "") {
                const guestId = `${docval["ID"]}`;
                const guest: GuestUpdate = {
                    "id": guestId,
                    "name": docval["NameOnCard"],
                    "nickName": docval["RefName"],
                    "inviteMode": docval["InviteMode"],
                    "side": docval["Side"],
                    "seats": docval["Seats"],
                    "expectSeats": docval["ExpectSeats"],
                    "contact1": docval["Contact1"],
                    "contact2": docval["Contact2"],
                    "address":docval["Address"],
                    "tableNo": docval["TABEL"],
                    "tag1": docval["Tag1"],
                    "tag2": docval["Tag2"],
                    "tag3": docval["Tag3"],
                    "keywords1": createKeyWords(docval["NameOnCard"]),
                    "invited":false
                }
                const guestRef=admin.firestore().collection("guests").doc(guestId);
                const updateGuest=Utills.removeUndefinedProps(guest);
                await guestRef.update(updateGuest);
                saved++;
            } 
        });
        await batch.commit();
      
       return `Updated  ${allguests.length} records, ${saved} saved`;
    } catch (error) {
        throw error;
    }
}


export default {
    importGuests,
    getGuests,
    getGuestById,
    updateGuestsList,
    updateGuestById
}
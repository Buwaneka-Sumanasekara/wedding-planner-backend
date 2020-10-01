/*
 * File: invitations.ts
 * File Created: Thursday, 3rd September 2020 6:51:11 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Thursday, 3rd September 2020 6:51:11 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";



const onCreate_Invitation = functions.firestore
  .document('invitations/{id}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
    admin.firestore().collection("guests").doc(`${newValue.guestId}`).update({ "refCode": newValue.refCode, "linkGenerated": true, "invited": true }).then(s => {
      console.log("test")
    }).catch(err => {
      console.log("errro")
    });
  });

const onDelete_Invitation = functions.firestore
  .document('invitations/{id}')
  .onDelete((snap, context) => {
   // const newValue = snap.data();
    // admin.firestore().collection("guests").doc(`${newValue.guestId}`).update({ "refCode": "", "linkGenerated": false, "invited": false }).then(s => {
    //   console.log("test")
    // }).catch(err => {
    //   console.log("errro")
    // });
  });

const onUpdate_Invitation = functions.firestore
  .document('invitations/{id}')
  .onUpdate((snap, context) => {
    const newValue = snap.after.data();
    admin.firestore().collection("guests").doc(`${newValue.guestId}`).update({ "refCode": newValue.refCode }).then(s => {
      console.log("test")
    }).catch(err => {
      console.log("errro")
    });
  });


const onUpdate_Guest = functions.firestore
  .document('guests/{id}')
  .onUpdate((snapshot, context) => {
    //const newValue = snap.after.data();
    const ref = admin.firestore().collection("guests")
    const query: admin.firestore.Query<admin.firestore.DocumentData> = ref;
    return query.get().then(snap => {
      //const result: Array<any> = [];
      let totalCount = 0;
      let arrivedCount = 0;
      let Sulari_Total = 0;
      let Buwaneka_Total = 0;

      let Sulari_Arrived = 0;
      let Buwaneka_Arrived = 0;

      if (snap !== undefined && !snap.empty) {
        snap.forEach(doc => {
          const data: any = doc.data();
          totalCount += data["seats"];
          if (data["attendedCount"] !== undefined && data["attendedCount"] !== null) {
            arrivedCount += data["attendedCount"];
            if (data["side"] === "B") {
              Buwaneka_Total += data["seats"];
              Buwaneka_Arrived += data["attendedCount"];
            } else {
              Sulari_Total += data["seats"];
              Sulari_Arrived += data["attendedCount"];
            }
          }

        });
      }

      console.log(`Seats count: ${arrivedCount} / ${totalCount}`)

      return admin.database().ref("Dashboard").update({ "Arrived": arrivedCount, "Total": totalCount,"Buwaneka_Total":Buwaneka_Total,"Buwaneka_Arrived":Buwaneka_Arrived,"Sulari_Total":Sulari_Total,"Sulari_Arrived":Sulari_Arrived }).then(data => {
        console.log("Success on onArivalCountChange | Update", `${arrivedCount} / ${totalCount}`);
        return true;
      }).catch(err => {
        console.log("ERROR on onArivalCountChange | Update", err.message);
        throw err;
      })

    }).catch(err => {
      console.log("ERROR on onArivalCountChange", err.message);
      throw err;
    });

  });


export {
  onCreate_Invitation,
  onDelete_Invitation,
  onUpdate_Invitation,
  onUpdate_Guest
}  
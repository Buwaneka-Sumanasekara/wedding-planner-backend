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
    admin.firestore().collection("guests").doc(`${newValue.guestId}`).update({"refCode":newValue.refCode,"linkGenerated":true}).then(s => {
      console.log("test")
    }).catch(err => {
      console.log("errro")
    });
  });

  const onDelete_Invitation = functions.firestore
  .document('invitations/{id}')
  .onDelete((snap, context) => {
    const newValue = snap.data();
    admin.firestore().collection("guests").doc(`${newValue.guestId}`).update({"refCode":"","linkGenerated":false}).then(s => {
      console.log("test")
    }).catch(err => {
      console.log("errro")
    });
  });

  const onUpdate_Invitation = functions.firestore
  .document('invitations/{id}')
  .onUpdate((snap, context) => {
    const newValue = snap.after.data();
    admin.firestore().collection("guests").doc(`${newValue.guestId}`).update({"refCode":newValue.refCode}).then(s => {
      console.log("test")
    }).catch(err => {
      console.log("errro")
    });
  });
export {
  onCreate_Invitation,
  onDelete_Invitation,
  onUpdate_Invitation
}  
/*
 * File: invitationController.ts
 * File Created: Thursday, 3rd September 2020 3:46:46 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Thursday, 3rd September 2020 3:46:47 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import * as admin from 'firebase-admin';
import { Invitation, NewInvitation } from "../models";
import GuestController from "./guestController";



const createInvitationLink = async (newinvitation: NewInvitation) => {
  try {

    const invitation: Invitation = {
      "status": true,
      "refCode": Buffer.from(`${newinvitation.guestId}`).toString('base64'),
      "guestId": `${newinvitation.guestId}`,
      "scanned":false
    }
    await admin.firestore().collection("invitations").doc(invitation.refCode).set(invitation);
    return invitation;
  } catch (error) {
    throw error;
  }
}

const getInvitationDetails = async (refCode: string) => {
  try {
    

    const ref = admin.firestore().collection("invitations")
    let query: admin.firestore.Query<admin.firestore.DocumentData> = ref;
    query = query.where("refCode", "==", refCode)
    return query.limit(1).get().then(snap_invitation => {
      if (snap_invitation.empty) {
        throw new Error("Your not invited")
      } else {
        const invitations: Array<any> = [];
        snap_invitation.forEach(doc => invitations.push(doc.data()));
        let invitation: Invitation = invitations[0];
        return GuestController.getGuestById(invitation.guestId).then(value => {

          return admin.storage().bucket("wedding-planer-517fe.appspot.com").file("qr-code.svg").getSignedUrl({
            action: 'read',
            expires: '30-10-2020'
          }).then(signeUrls => {
            invitation = { ...invitation, "qrCode": signeUrls[0],"guest":value }
            return invitation;
          }).catch(err => {
            throw err;
          })
        }).catch(error => {
          throw error;
        })
      }
    }).catch(err => {
      throw err;
    })
  } catch (error) {
    throw error;
  }
}

export default {
  createInvitationLink,
  getInvitationDetails
}
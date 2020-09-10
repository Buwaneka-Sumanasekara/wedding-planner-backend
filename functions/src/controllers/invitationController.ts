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
import { INVITATION } from '../constants-data';



const createInvitationLink = async (newinvitation: NewInvitation) => {
  try {

    const invitation: Invitation = {
      "status": true,
      "refCode": Buffer.from(`${newinvitation.guestId}`).toString('base64'),
      "guestId": `${newinvitation.guestId}`,
      "scanned": false,
      "accepted": false
    }
    await admin.firestore().collection("invitations").doc(invitation.refCode).set(invitation);
    return invitation;
  } catch (error) {
    throw error;
  }
}

const getInvitationDetails = async (refCode: string) => {
  try {

    //const expired_date=((process.env.FUNCTIONS_EMULATOR && process.env.FIRESTORE_EMULATOR_HOST)?'30-10-2020':'2020-10-30');

    const ref = admin.firestore().collection("invitations")
    let query: admin.firestore.Query<admin.firestore.DocumentData> = ref;
    query = query.where("refCode", "==", refCode)
    return query.limit(1).get().then(snap_invitation => {
      if (snap_invitation.empty) {
        throw new Error("You are not invited")
      } else {
        const invitations: Array<any> = [];
        snap_invitation.forEach(doc => invitations.push(doc.data()));
        let invitation: Invitation = invitations[0];
        return GuestController.getGuestById(invitation.guestId).then(value => {

          invitation = { ...invitation, "qrCode": "", "guest": value, "eventLocation": INVITATION.LOCATION, "eventDate": INVITATION.DATE, "poruwaCeromoney": INVITATION.PORUWA_CEROMONEY }
          return invitation;

          // return admin.storage().bucket("wedding-planer-517fe.appspot.com").file("qr-code.svg").getSignedUrl({
          //   action: 'read',
          //   //expires: '30-10-2020'
          //   expires:expired_date 
          // }).then(signeUrls => {


          // }).catch(err => {
          //   throw err;
          // })
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

const acceptedDeclineInvitation = async (invitation: Invitation) => {
  try {
    await admin.firestore().collection("invitations").doc(invitation.refCode).update({ "accepted": invitation.accepted })
    return invitation;
  } catch (error) {
    throw error;
  }
}


export default {
  createInvitationLink,
  getInvitationDetails,
  acceptedDeclineInvitation
}
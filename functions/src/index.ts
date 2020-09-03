import * as admin from 'firebase-admin';

import * as api from './api';
import * as triggers from './triggers';


const serviceaccount:admin.ServiceAccount={
    "projectId": "wedding-planer-517fe",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEVxPd1QWGyLp3\nrlGMP9sFlLLYTktHqw9pWAcobWxgUZtzQ8Y8RFF7mGEZabmCEncSvL+ft+U04zRN\naOz4q964GLaLc/Ny3Uc/tOdiyv604fzd3dv7qwWP+AIb53Igy/59/tysZQjX1vwM\nEBtGTGYfbv2mv/c5KcuXgDdCjpVLYkVCASEoFgRxX9Tgxff4Qv8237pBsnQ9L0ZN\nDjZp2kdo9aNC6g03ZN3ekxuOVhRdrN159TkaWNpX+H1FosiBgC45yXmQcOE13u0f\nfKHQA+ij5vpcdvKL+OWXj9W/eWOZgZ9AX8poaxSV/03iJfRXqdmzxJsKrP8Z9+Xw\nvqq5L/dNAgMBAAECggEAIUzAhJTy10GXqKFC2PXilI98BsY+q9TWLBB/RErMwQhO\nRG4oAsQ2iq8VNt1w1mAB3IZxPKpQoFfxoLhtSp7Byzj7yuqbTW28vhAVV3Lk4LJc\ndBfDDevbaWfPmcJ3H5thmiZ98GpBZfQjMvuPWKyv/GBTenLgAAy36EXZeXsb1Jk1\nvlk+ip1LCGvSkJ7lZMJB/yu7ShqlQOAmBogIG7vLLEF4V2FdQs8NdBcVitQGb6Zp\nb4/F+KCIOGzv9bdrah98/IX38+eEHyge4hGBkht0xyFA1eGEoFUjCdBQo8OCxf2T\ndDPPVkIb8wrOXTLszkK3MtesQDBp49GD+Ot4rMWWGQKBgQDvUMnooonMltHKNC4L\nNJejXHPFODURBtj6XXnX4QFy9iUrGURZSdmV51+QXNEy9lZ6sGnNCyQj3suDQU68\nkw/oCol5l46NBjOZavyIK0NwBY/2PIMuPzY7HD3EHqCc+IZfH3S7P+lcdwDrFeWn\nGyl6Lnc7DWxQ7cdvqhJth8UemQKBgQDSB0ezygG1pvTO5ziIvbZWwlfFY4tNQ0hz\nhdFmOgklbQNMKKnomMaEhIhk6VZIJgeTflwHSC4IC7z+p3liHqg3B5XN0v+FRJft\nhw/b7aJXy/heiY39o9eHlaGwhqmPhTb72HSM1VdsSWCMSfG62xng5ILnUb7SVo7K\nwb4UmDTS1QKBgQDgt2jQxIdGkDxwdaziosDdCfw/rbbOxTJLbijyWHsG2zEtli1C\n9oCVLUzj/vQFuaCc1jiS7CpEcHmDR3jKxAEEr5hFj9WwgKlFH1v/9Tf+4Yo7+rhn\nXb3rpWouVWAV5ZwviBcRmULkq242UTpzPqMk8qrMzZ7vI0fJh9aD+SBUyQKBgFKh\nepxJhZKqNPaSEbP6r5pCq7WFDHFBX2fT5iaJ/r8yvHFiLjbMpI3Odrr88m1ASQrG\nU/6pbzLLK3gk+6SW2yeLXGy17sHH0t4onRyxyYUxQm4vQCXiKBG31P1Wfa9xgchj\nyLb/2H1KASowjWIugWfxf27ywliOpW8v+lCv8VhhAoGAfPbOVumTC8ivYNor+C4E\ne5+cNjGhrio+6PmOVHQFgzDIUjToNdwJTsuv1IUSC52nCkJdBqGIMd6elc4KzY6W\nHOcfShu43S+wNSXTiAvWhWTP9d1CToVdj0Jb9ODCUIrkLOmVgM8jc1atvRHUYArk\njqL/oBetCTAOLlNPtLqc/UY=\n-----END PRIVATE KEY-----\n",
    "clientEmail": "firebase-adminsdk-tvbcz@wedding-planer-517fe.iam.gserviceaccount.com",
  }

admin.initializeApp({
  credential: admin.credential.cert(serviceaccount),
  databaseURL: "https://wedding-planer-517fe.firebaseio.com"
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });





//API
exports.webApi = api.webApi;
exports.onCreateInvitation = triggers.onCreate_Invitation;
exports.onUpdateInvitation = triggers.onUpdate_Invitation;
exports.onDeleteInvitation = triggers.onDelete_Invitation;

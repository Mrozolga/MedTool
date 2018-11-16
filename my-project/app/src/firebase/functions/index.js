// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

exports.checkAlias = functions.https.onCall((data,context) => {

  const ref = admin.firestore().collection('users').doc(data.slug);
  return ref.get().then(doc => {
    return { unique: !doc.exists }
  }).catch( () => {
    throw new functions.https.HttpsError('failed to connect')
  });

})

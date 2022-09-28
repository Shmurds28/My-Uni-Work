const functions = require("firebase-functions");
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

admin.initializeApp();


const ALGOLIA_APP_ID = "F1IS3BSDLF";
const ALGOLIA_ADMIN_KEY = "7614a16f2b486d246769f5557f4f11a9";
var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
var moduleIndex = client.initIndex("modules");

// exports.makeUppercase = functions.firestore.document('/modules/{documentId}')
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Firestore.
//       const original = snap.data().moduleCode;

//       // Access the parameter `{documentId}` with `context.params`
//       functions.logger.log('Uppercasing', context.params.documentId, original);
      
//       const uppercase = original.toUpperCase();
      
//       // You must return a Promise when performing asynchronous tasks inside a Functions such as
//       // writing to Firestore.
//       // Setting an 'uppercase' field in Firestore document returns a Promise.
//       return snap.ref.set({uppercase}, {merge: true});
//     });



exports.createModule = functions.firestore.document('/modules/{documentId}')
    .onCreate((snap, context) => {
      const data = snap.data();
      const objectID = snap.id;
      return moduleIndex.saveObject({data, objectID});
    });
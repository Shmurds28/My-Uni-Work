const { config, database } = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const { syncAlgoliaWithFirebase } = require('algolia-firebase-functions');

admin.initializeApp(config().firebase);
const algolia = algoliasearch(functions.config().algolia.app,
                              functions.config().algolia.key);
const index = algolia.initIndex(functions.config().algolia.index);


exports.syncAlgoliaFunction = database.ref('/modules/{documentID}').onWrite(
   (change, context) => syncAlgoliaWithFirebase(index, change)
)
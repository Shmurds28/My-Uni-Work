import * as functions from require("firebase-functions");
const algoliasearch = require('algoliasearch');
import * as admin from require("firebase-admin/app");
admin.initializeApp();

const ALGOLIA_APP_ID = "F1IS3BSDLF";
const ALGOLIA_ADMIN_KEY = "7614a16f2b486d246769f5557f4f11a9";
const ALGOLIA_INDEX_NAME = "modules";

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex("modules");


exports.addModuleToIndex = functions.firestore.document('modules/{moduleId}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data();
        data.objectID = snapshot.id;
        
        return index.saveObject(data);
    });
        
        
// exports.UpdateModuleToIndex = functions.firestore.document('modules/{moduleID}')
//     .onUpdate(async (change) => {
//         const newData = change.after.data();
//         objectID = change.after.id;
        
//         return await index.saveObject({newData, objectID: objectID}).catch(err => console.error(err));
//     });
    
    
// exports.deleteFromIndex = functions.firestore.document("modules/{moduleId}")
//     .onDelete(async (snapshot) =>  {
//         return await index.deleteObject(snapshot.id).catch(err => console.error(err));
//     });




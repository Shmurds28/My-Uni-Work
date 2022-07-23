// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZgN5DxQT60EVv-YlvXANAiDahHSzya2A",
    authDomain: "myuniwork-b6880.firebaseapp.com",
    projectId: "myuniwork-b6880",
    storageBucket: "myuniwork-b6880.appspot.com",
    messagingSenderId: "77703230322",
    appId: "1:77703230322:web:7e706bd4d56fceb2f323eb",
    measurementId: "G-5FJFZG42SS"
  };


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
// const analytics = getAnalytics(app);

export default app;
export { db, storage };

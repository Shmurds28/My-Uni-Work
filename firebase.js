// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

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
const auth = getAuth();
// const analytics = getAnalytics(app);

export default app;
export { db, storage, auth};

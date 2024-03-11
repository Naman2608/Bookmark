// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqcEvDUg4R-j7A2j5_gcIKeRCgOHFLZRU",
    authDomain: "bookmark-001.firebaseapp.com",
    databaseURL: "https://bookmark-001-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bookmark-001",
    storageBucket: "bookmark-001.appspot.com",
    messagingSenderId: "245160173653",
    appId: "1:245160173653:web:8f3b55d270a2dcbc05f4dc",
    measurementId: "G-MJMDFXFDL0"
};

// Initialize Firebase
let firebase_app = initializeApp(firebaseConfig);
export default firebase_app;
// const analytics = getAnalytics(app);
export const auth = getAuth(firebase_app);
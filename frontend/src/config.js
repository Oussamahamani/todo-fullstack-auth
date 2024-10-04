// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"

// import config from "./firebaseConfig"
// Your web app's Firebase configuration
// Initialize Firebase
//replace this with your firebase config
const app = initializeApp({
    apiKey: "AIzaSyBgtXsK-seNZ0zeoedi9FWm6rdJ--i78jE",
    authDomain: "auht-lesson.firebaseapp.com",
    projectId: "auht-lesson",
    storageBucket: "auht-lesson.appspot.com",
    messagingSenderId: "179290165103",
    appId: "1:179290165103:web:319135338a75d06a90a29a"
  }
  
);

const auth = getAuth(app)

export {auth}

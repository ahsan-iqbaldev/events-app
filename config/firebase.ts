import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0-BtBrKT-f80qn6bxPVn0QI328A_E5MQ",
  authDomain: "ticketly-32629.firebaseapp.com",
  projectId: "ticketly-32629",
  storageBucket: "ticketly-32629.appspot.com",
  messagingSenderId: "1002791695132",
  appId: "1:1002791695132:web:7553372c769c1c367240d9",
  measurementId: "G-9QCW7H7MRC"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

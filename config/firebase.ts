import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIkv5DbucGizeD4xDAfkkNN_gRLdUJAiU",
  authDomain: "evently-14e52.firebaseapp.com",
  projectId: "evently-14e52",
  storageBucket: "evently-14e52.appspot.com",
  messagingSenderId: "502984291442",
  appId: "1:502984291442:web:4c989d18a56be39d383eeb",
  measurementId: "G-ZB7B31C1W2",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV_L0bhCl-wP-cZzwUBZSBLR7Egp-l70w",
  authDomain: "twofactorauth-aedf5.firebaseapp.com",
  projectId: "twofactorauth-aedf5",
  storageBucket: "twofactorauth-aedf5.appspot.com",
  messagingSenderId: "176542876386",
  appId: "1:176542876386:web:5d27551422895806ac94bb",
  measurementId: "G-8YM4B1ME9F"
};

const initFirebase = () => {
  if (firebase.apps.length === 0 && !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  
  //if (STAGE === 'dev') {
  //    firebase.functions().useEmulator('localhost', 5000);
  //}

  if (typeof window !== 'undefined' && !firebase.apps.length) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      firebase.firestore().enablePersistence()
      .catch((err) => {
          if (err.code == 'failed-precondition') {
              console.warn("Multiple tabs open, persistence can only be enabled in one tab at a a time.")
          } else if (err.code == 'unimplemented') {
              console.warn("The current browser does not support all of the features required to enable persistence.")
          }
      });
  }
}

export default initFirebase;

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
//   measurementId: "YOUR_MEASUREMENT_ID"
// };
const firebaseConfig = {
  apiKey: "AIzaSyA4vh55jxmsSyFocm0iVirOKWKIi913giM",
  authDomain: "e-commerce-bee09.firebaseapp.com",
  projectId: "e-commerce-bee09",
  storageBucket: "e-commerce-bee09.appspot.com",
  messagingSenderId: "1089328260784",
  appId: "1:1089328260784:web:c1025fe271b00ca8c63d75"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export {auth, db, googleProvider,signInWithPopup, signOut };

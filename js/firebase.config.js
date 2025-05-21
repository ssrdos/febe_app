// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkQeHiYJ1mEKImeL_DahQTmDCyUhFlgFY",
  authDomain: "febe-app-c85af.firebaseapp.com",
  projectId: "febe-app-c85af",
  storageBucket: "febe-app-c85af.firebasestorage.app",
  messagingSenderId: "432785280683",
  appId: "1:432785280683:web:023856853f8df977c231ee",
  measurementId: "G-P6FJ34S5Q0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
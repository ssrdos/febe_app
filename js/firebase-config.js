// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZHY6BEcypXZ_hBe2BlPY0VojrHKK0lLY",
  authDomain: "febe-app-96c07.firebaseapp.com",
  projectId: "febe-app-96c07",
  storageBucket: "febe-app-96c07.firebasestorage.app",
  messagingSenderId: "781571458601",
  appId: "1:781571458601:web:007b9028cff5544d32be38",
  measurementId: "G-FMJBC62H3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
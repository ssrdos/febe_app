import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAkQeHiYJ1mEKImeL_DahQTmDCyUhFlgFY",
  authDomain: "febe-app-c85af.firebaseapp.com",
  projectId: "febe-app-c85af",
  storageBucket: "febe-app-c85af.firebasestorage.app",
  messagingSenderId: "432785280683",
  appId: "1:432785280683:web:023856853f8df977c231ee",
  measurementId: "G-P6FJ34S5Q0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get };
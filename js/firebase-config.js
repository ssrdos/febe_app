// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZHY6BEcypXZ_hBe2BlPY0VojrHKK0lLY",
    authDomain: "febe-app-96c07.firebaseapp.com",
    projectId: "febe-app-96c07",
    databaseURL: "https://febe-app-96c07-default-rtdb.firebaseio.com",
    storageBucket: "febe-app-96c07.firebasestorage.app",
    messagingSenderId: "781571458601",
    appId: "1:781571458601:web:007b9028cff5544d32be38",
    measurementId: "G-FMJBC62H3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
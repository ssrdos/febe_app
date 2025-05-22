// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js';
import { initializeAppCheck, ReCaptchaV3Provider } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-check.js';

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

// Initialize App Check in debug mode for development
self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
    isTokenAutoRefreshEnabled: true
});

const db = getDatabase(app);

export { db, appCheck };
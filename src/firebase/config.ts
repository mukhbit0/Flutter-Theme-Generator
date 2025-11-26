import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDWKH6WvdtGPq2nXgu_mYQiLls6XwtCWJI",
    authDomain: "flutter-theme-generator-658df.firebaseapp.com",
    projectId: "flutter-theme-generator-658df",
    storageBucket: "flutter-theme-generator-658df.firebasestorage.app",
    messagingSenderId: "977267810502",
    appId: "1:977267810502:web:ed3f316e1c71d09357b7c7",
    measurementId: "G-GMJTF9VN2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

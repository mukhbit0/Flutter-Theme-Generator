import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

export const initializeFirebase = async (): Promise<Auth> => {
    if (auth) return auth;

    try {
        // In development, we might still want to use local env vars if available, 
        // but for this specific request we are moving to runtime config.
        // We'll try to fetch from the worker endpoint.
        const response = await fetch('/api/config');

        if (!response.ok) {
            throw new Error(`Failed to fetch config: ${response.statusText}`);
        }

        const config = await response.json();

        const firebaseConfig = {
            apiKey: config.VITE_FIREBASE_API_KEY,
            authDomain: config.VITE_FIREBASE_AUTH_DOMAIN,
            projectId: config.VITE_FIREBASE_PROJECT_ID,
            storageBucket: config.VITE_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: config.VITE_FIREBASE_MESSAGING_SENDER_ID,
            appId: config.VITE_FIREBASE_APP_ID,
            measurementId: config.VITE_FIREBASE_MEASUREMENT_ID
        };

        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        return auth;
    } catch (error) {
        console.error("Error initializing Firebase:", error);
        throw error;
    }
};

export const getFirebaseAuth = (): Auth => {
    if (!auth) {
        throw new Error("Firebase not initialized. Call initializeFirebase() first.");
    }
    return auth;
};

// For backward compatibility during refactor, we might export a proxy or similar,
// but since we are updating AuthContext, we don't need to export 'auth' directly anymore.

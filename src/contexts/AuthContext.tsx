import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { initializeFirebase, getFirebaseAuth } from '../firebase/config';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    signup: (email: string, pass: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const init = async () => {
            try {
                const auth = await initializeFirebase();
                unsubscribe = onAuthStateChanged(auth, (user) => {
                    setCurrentUser(user);
                    setLoading(false);
                });
            } catch (err: any) {
                console.error("Failed to initialize Firebase:", err);
                setError("Failed to initialize application");
                setLoading(false);
            }
        };

        init();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const login = async (email: string, pass: string) => {
        setError(null);
        try {
            const auth = getFirebaseAuth();
            await signInWithEmailAndPassword(auth, email, pass);
        } catch (err: any) {
            console.error("Login Error:", err);
            setError(err.message || "Failed to login");
            throw err;
        }
    };

    const signup = async (email: string, pass: string) => {
        setError(null);
        try {
            const auth = getFirebaseAuth();
            await createUserWithEmailAndPassword(auth, email, pass);
        } catch (err: any) {
            console.error("Signup Error:", err);
            setError(err.message || "Failed to create account");
            throw err;
        }
    };

    const signInWithGoogle = async () => {
        setError(null);
        try {
            const auth = getFirebaseAuth();
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            console.error("Google Sign-In Error:", err);
            if (err.code === 'auth/unauthorized-domain') {
                setError("Domain not authorized. Please add this domain to Firebase Console -> Authentication -> Settings -> Authorized Domains.");
            } else {
                setError(err.message || "Failed to sign in with Google");
            }
            throw err;
        }
    };

    const logout = async () => {
        setError(null);
        try {
            const auth = getFirebaseAuth();
            await signOut(auth);
        } catch (err: any) {
            console.error("Logout Error:", err);
            setError(err.message || "Failed to logout");
            throw err;
        }
    };

    const clearError = () => setError(null);

    const value = {
        currentUser,
        loading,
        login,
        signup,
        signInWithGoogle,
        logout,
        error,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

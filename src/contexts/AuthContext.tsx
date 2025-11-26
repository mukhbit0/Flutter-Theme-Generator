import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    AuthError
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    signup: (email: string, pass: string) => Promise<void>;
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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email: string, pass: string) => {
        setError(null);
        try {
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
            await createUserWithEmailAndPassword(auth, email, pass);
        } catch (err: any) {
            console.error("Signup Error:", err);
            setError(err.message || "Failed to create account");
            throw err;
        }
    };

    const logout = async () => {
        setError(null);
        try {
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

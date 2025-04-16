"use client";

import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { app } from '@/lib/firebase'; // Import your Firebase app instance

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        
        return () => unsubscribe();
    }, [auth]);

    const signIn = async (email: string, password: string): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(`Failed to sign in: ${(error as Error).message}`);
        }
    };

    const signUp = async (email: string, password: string): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(`Failed to sign up: ${(error as Error).message}`);
        }
    };
    const signOut = async (): Promise<void> => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            throw new Error(`Failed to sign out: ${(error as Error).message}`);
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
    };
    const authProvider = <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    return authProvider;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

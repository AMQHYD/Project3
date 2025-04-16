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
import { useSession, signOut as nextAuthSignOut, signIn as nextAuthSignIn } from "next-auth/react"

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

export const useAuth = () => {
  const { data: session, status } = useSession()

  const signIn = async (email: string, password: string) => {
    try {
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      return result
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    await nextAuthSignOut()
  }

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    signIn,
    signOut,
  }
}

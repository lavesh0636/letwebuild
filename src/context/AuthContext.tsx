"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Session, User } from "@supabase/supabase-js";
import { Profile, Talent, Client } from "@/lib/supabase";

type ProfileType = {
  id: string;
  full_name?: string;
  avatar_url?: string;
  account_type?: "talent" | "client" | "admin";
};

type AuthContextType = {
  user: User | null;
  profile: ProfileType | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  githubSignIn: () => Promise<void>;
  updateProfile: (updates: Partial<ProfileType>) => Promise<{ success: boolean; error: Error | null }>;
  refreshProfile: () => Promise<void>;
  getRedirectPath: () => string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Use a single effect for session management to reduce complexity
  useEffect(() => {
    let isMounted = true;
    
    const handleAuthChange = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error && isMounted) {
          console.error("Error getting session:", error);
          setIsLoading(false);
          return;
        }
        
        if (isMounted) {
          setSession(data.session);
          setUser(data.session?.user || null);
          
          if (data.session?.user) {
            await fetchProfile(data.session.user.id);
          }
          
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Unexpected error during session check:", error);
          setIsLoading(false);
        }
      }
    };

    // Initial session check
    handleAuthChange();

    // Set up auth state listener with proper cleanup
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (isMounted) {
          setSession(currentSession);
          setUser(currentSession?.user || null);
          
          if (currentSession?.user) {
            await fetchProfile(currentSession.user.id);
          } else {
            setProfile(null);
          }
        }
      }
    );

    // Cleanup function to prevent memory leaks and state updates on unmounted components
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Unexpected error fetching profile:", error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error signing up:", error);
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (error) {
      console.error("Unexpected error during signup:", error);
      return { user: null, error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error);
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (error) {
      console.error("Unexpected error during signin:", error);
      return { user: null, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Unexpected error during signout:", error);
    }
  };

  const googleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Error with Google sign in:", error);
      }
    } catch (error) {
      console.error("Unexpected error during Google signin:", error);
    }
  };

  const githubSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Error with GitHub sign in:", error);
      }
    } catch (error) {
      console.error("Unexpected error during GitHub signin:", error);
    }
  };

  const updateProfile = async (updates: Partial<ProfileType>) => {
    if (!user) {
      return { success: false, error: new Error("No user authenticated") };
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            updated_at: new Date().toISOString(),
            ...updates,
          },
          {
            onConflict: "id"
          }
        );

      if (error) {
        console.error("Error updating profile:", error);
        return { success: false, error };
      }

      await fetchProfile(user.id);
      return { success: true, error: null };
    } catch (error) {
      console.error("Unexpected error updating profile:", error);
      return { success: false, error: error as Error };
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const getRedirectPath = () => {
    if (!user || !profile) return "/login";
    
    switch (profile.account_type) {
      case "talent":
        return "/talent/dashboard";
      case "client":
        return "/client/dashboard";
      case "admin":
        return "/admin";
      default:
        return "/onboarding";
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    googleSignIn,
    githubSignIn,
    updateProfile,
    refreshProfile,
    getRedirectPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 

import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signUp: (email: string, password: string, options?: { data?: { first_name?: string; last_name?: string } }) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signOut: () => Promise<void>;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === "SIGNED_IN") {
          toast.success("Signed in successfully");
        } else if (event === "SIGNED_OUT") {
          toast.success("Signed out successfully");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const refreshUser = async () => {
    const { data } = await supabase.auth.refreshSession();
    setSession(data.session);
    setUser(data.user);
  };

  const signUp = async (email: string, password: string, options?: { data?: { first_name?: string; last_name?: string } }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options?.data || {}
        }
      });
      
      if (!error && data?.user) {
        // Create a profile entry in the profiles table
        if (options?.data?.first_name || options?.data?.last_name) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            first_name: options?.data?.first_name || '',
            last_name: options?.data?.last_name || '',
            updated_at: new Date().toISOString(),
          });
        }
        
        toast.success("Account created! Please check your email to confirm your account.");
      }
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (!error) {
        navigate('/dashboard');
      }
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signUp, signIn, signOut, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

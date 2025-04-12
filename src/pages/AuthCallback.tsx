
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingScreen from "@/components/auth/LoadingScreen";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error during auth callback:", error);
        navigate("/auth");
      } else {
        // Always redirect to dashboard on successful authentication
        console.log("Auth callback successful, redirecting to dashboard");
        navigate("/dashboard", { replace: true });
      }
    };
    
    handleAuthCallback();
  }, [navigate]);

  return <LoadingScreen />;
};

export default AuthCallback;

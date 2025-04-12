
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "./LoadingScreen";

export const PublicRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // Redirect to dashboard if user is already authenticated
      console.log("Already authenticated, redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  // Only render the public routes if not authenticated
  return !user ? <Outlet /> : null;
};

export default PublicRoute;


import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/components/auth/LoadingScreen";

const RequireAuth: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default RequireAuth;

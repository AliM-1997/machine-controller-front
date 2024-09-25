import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../data/constext/authContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  console.log(
    "isAuthenticated:",
    isAuthenticated,
    "user:",
    user,
    "loading:",
    loading,
    "requiredRole:",
    requiredRole
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

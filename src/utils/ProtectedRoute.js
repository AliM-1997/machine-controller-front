import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authDataSourse } from "../data/local/Auth_local";

const UserRouteProtector = ({ requiredRole }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const { email, role } = await authDataSourse.verifyToken(token);
      setIsAuthenticated(true);
      setUserRole(role);
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserRouteProtector;

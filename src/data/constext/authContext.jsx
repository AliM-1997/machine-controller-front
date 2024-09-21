import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const navigate = useNavigate();

  // Check for authentication token
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user"); // Optional: If you're storing user info in localStorage

    if (token) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(user), // Parse the user info if stored as a JSON string
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
      navigate("/login"); // Redirect to login if not authenticated
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

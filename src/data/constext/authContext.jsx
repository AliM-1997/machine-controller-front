import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: "",
  });
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthState({
        isAuthenticated: true,
        // user: {
        //   //   localStorage.user.role,
        // },
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
      navigate("/login");
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

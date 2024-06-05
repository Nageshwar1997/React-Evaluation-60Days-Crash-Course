/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  

  const [authState, setAuthState] = useState({
    isAuthenticated:  false,
    token: null,
    email: null,
  });

  const login = (email, token) => {
    setAuthState({ isAuthenticated: true, token, email });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, token: null, email: null });
    localStorage.removeItem("loginData");
  };
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

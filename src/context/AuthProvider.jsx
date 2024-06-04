/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  let loginData = JSON.parse(localStorage.getItem("loginData")) || {
    isAuthenticated: false,
    token: null,
    email: null,
  };
  console.log(loginData);

  const [authState, setAuthState] = useState({
    isAuthenticated: loginData?.token && loginData?.email ? true : false,
    token: loginData.token || null,
    email: loginData.email || null,
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

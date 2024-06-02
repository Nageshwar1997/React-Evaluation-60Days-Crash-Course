/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    email: null,
  });

  const login = (email, token ) => {
    setAuthState({
      isAuthenticated: true,
      email,
      token,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      email: null,
    });
  };
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

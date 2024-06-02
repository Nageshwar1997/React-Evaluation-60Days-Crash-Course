/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { authState } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      {!authState.isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />,
          <Route path="/product" element={<ProductDetails />} />
        </Routes>
      )}
    </>
  );
}

export default App;

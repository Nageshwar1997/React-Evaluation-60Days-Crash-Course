import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";

function App() {
  const { authState } = useContext(AuthContext);
  console.log(authState);
  return (
    <>
      <Navbar />
      <Routes>
        {authState.isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

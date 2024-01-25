import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Header from "./components/Header";
import { validToken } from "./Utility/auth";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("tm_token");

  useEffect(() => {
    if (token && validToken(token)) {
      navigate("/");
    } else {
      navigate("/signin");
      localStorage.removeItem("tm_token");
    }
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#d3d3d3",
      }}
    >
      <Header />

      <Routes>
        <Route path="/signin" element={<Signin />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

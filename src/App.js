import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import OrderPage from "./Pages/OrderPage";
import ProfilePage from "./Pages/ProfilePage";
import SignUpPage from "./Pages/SignUpPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import OrderPage from "./Pages/OrderPage";

import SignUpPage from "./Pages/SignUpPage";
import ProductsPage from "./Pages/ProductsPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

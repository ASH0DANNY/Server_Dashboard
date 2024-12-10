import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import OrderPage from "./Pages/OrderPage";

import SignUpPage from "./Pages/SignUpPage";
import ProductsPage from "./Pages/ProductsPage";
import { auth } from "./Firebase";
import ClientsPage from "./Pages/ClientsPage";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      await setUser(user);
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <SignUpPage />}
          />
          <Route
            path="/dashboard"
            element={user ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/orders"
            element={user ? <OrderPage /> : <Navigate to="/" />}
          />
          <Route
            path="/products"
            element={user ? <ProductsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/clients"
            element={user ? <ClientsPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;

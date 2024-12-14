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
import { auth } from "./Firebase";

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
            path="/Server_Dashboard/"
            element={user ? <Navigate to="/Server_Dashboard/dashboard" /> : <SignUpPage />}
          />
          <Route
            path="/Server_Dashboard/dashboard"
            element={user ? <HomePage /> : <Navigate to="/Server_Dashboard/" />}
          />
          <Route
            path="/Server_Dashboard/orders"
            element={user ? <OrderPage /> : <Navigate to="/Server_Dashboard/" />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;

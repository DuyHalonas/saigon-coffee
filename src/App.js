import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import AppNavbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  return (
    <CartProvider>
      <Router>
        <AppNavbar setCartPosition={setCartPosition} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/:id"
            element={<ProductDetails cartPosition={cartPosition} />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;

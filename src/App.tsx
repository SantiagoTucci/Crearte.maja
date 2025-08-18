import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Header } from "@/components/header";
import Home from "@/pages/index";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import { CartProvider } from "@/hooks/cart-context"; 
import { ThemeProvider } from "next-themes";

function App() {
  return (
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inicio" element={<Home />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
  );
}

export default App;

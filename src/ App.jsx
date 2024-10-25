import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/Product';  // Kontrollera att denna import är korrekt
import Cart from './components/Cart';

function App() {
  const [cart, setCart] = useState([]);

  // Funktion för att lägga till en produkt i varukorgen
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(p => p.id === product.id);

      if (existingProduct) {
        // Öka kvantiteten om produkten redan finns i varukorgen
        console.log(`Ökar kvantiteten för ${product.name}`);
        return prevCart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        // Lägg till produkten i varukorgen om den inte redan finns
        console.log(`Lägger till ${product.name} i varukorgen`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Räkna totala antalet varor i varukorgen
  const cartCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <Router>
      <Navbar cartCount={cartCount} /> {/* Skickar antal köpta varor till Navbar */}
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/Product'; 
import Cart from './components/Cart';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(p => p.id === product.id);

      if (existingProduct) {
    
        console.log(`Ökar kvantiteten för ${product.name}`);
        return prevCart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        
        console.log(`Lägger till ${product.name} i varukorgen`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  
  const cartCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <Router>
      <Navbar cartCount={cartCount} /> {}
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;

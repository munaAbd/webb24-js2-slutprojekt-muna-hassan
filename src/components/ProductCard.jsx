import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart = [], setCart }) {  // Ger `cart` ett defaultvärde som en tom array

  const navigate = useNavigate();
  
  // Funktion för att beräkna totalpriset
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  // Hantera "Slutför köp"
  const handleCheckout = () => {
    alert('Tack för att du handlade hos oss!');
    setCart([]); // Töm varukorgen
    navigate('/'); // Dirigera tillbaka till produktsidan
  };

  return (
    <div>
      <h2>Kassa</h2>
      <p>Här kan du slutföra ditt köp.</p>

      {cart.length > 0 ? (
        <div>
          <h3>Produkter i varukorgen:</h3>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                <h4>{product.name} - {product.price} kr</h4>
                <p>Antal: 1</p> {/* Här kan kvantitetshantering läggas till */}
              </li>
            ))}
          </ul>

          <h3>Totalpris: {calculateTotal()} kr</h3>
          <button onClick={handleCheckout}>Slutför köp</button>
        </div>
      ) : (
        <p>Din varukorg är tom.</p>
      )}
    </div>
  );
}

export default Cart;

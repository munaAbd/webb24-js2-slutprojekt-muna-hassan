import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  // Funktion för att beräkna totalpriset
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Hantera "Slutför köp"
  const handleCheckout = () => {
    alert('Tack för att du handlade hos oss!');
    setCart([]); // Töm varukorgen
    navigate('/'); // Gå tillbaka till produktsidan
  };

  return (
    <div>
      <h2>Varukorg</h2>
      {cart.length > 0 ? (
        <div>
          <h3>Produkter i din varukorg:</h3>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                <h4>{product.name} - {product.price} kr</h4>
                <p>Antal: {product.quantity}</p>
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

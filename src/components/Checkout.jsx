import React from 'react';

const Checkout = ({ cart, clearCart }) => {
  // Funktion för att beräkna totalpris baserat på antalet produkter
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Funktion som körs vid slutförande av köp
  const handleCheckout = () => {
    alert('Köp slutfört! Tack för att du handlade hos oss!');
    clearCart(); // Tömmer varukorgen efter genomfört köp
  };

  return (
    <div>
      <h2>Kassa</h2>
      <p>Här kan du slutföra ditt köp.</p>

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
};

export default Checkout;

import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  
import { ref, get, update } from 'firebase/database';  

function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = ref(db, 'products'); 
      try {
        console.log("Försöker hämta produkter från Firebase...");
        const snapshot = await get(productsRef);  
        if (snapshot.exists()) {
          const productData = snapshot.val();  
          console.log("Produkter hämtade från Firebase:", productData);
          setProducts(Object.entries(productData).map(([key, value]) => ({ id: key, ...value })));  
        } else {
          console.log('Inga produkter hittades.');
        }
      } catch (error) {
        console.error('Fel vid hämtning av produkter:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (product.inventory > 0) {
      const newInventory = product.inventory - 1;
      const productRef = ref(db, `products/${product.id}`);  

      console.log(`Uppdaterar lagersaldo för ${product.name}, nytt saldo: ${newInventory}`);
      update(productRef, { inventory: newInventory })  
        .then(() => {
          console.log(`${product.name} lagersaldo uppdaterat i Firebase.`);


          const updatedProducts = products.map((p) =>
            p.id === product.id ? { ...p, inventory: newInventory } : p
          );
          setProducts(updatedProducts);  
          addToCart({ ...product, quantity: 1 });
        })
        .catch((error) => {
          console.error('Fel vid uppdatering av lagersaldo:', error);
        });
    } else {
      alert('Produkten är slut i lager');
    }
  };

  if (loading) {
    return <p>Laddar produkter...</p>;
  }

  return (
    <div>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name} - {product.price} kr</h2>
              <img src={product.image} alt={product.name} style={{ width: '100px' }} />
              <p>Lagersaldo: {product.inventory > 0 ? product.inventory : 'Slut i lager'}</p>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.inventory === 0}
              >
                Köp nu
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga produkter tillgängliga just nu.</p>
      )}
    </div>
  );
}

export default Product;

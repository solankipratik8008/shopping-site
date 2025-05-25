import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handlePurchase = () => {
    alert('🎉 Purchase complete! Thank you for your order.');
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Link to="/">← Back to Products</Link>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
              <h3>{item.name}</h3>
              <img src={item.image} alt={item.name} width="100" />
              <p>{item.description}</p>
              <label>Quantity: </label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
              />
              <br />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <button onClick={handlePurchase} style={{ marginTop: '20px' }}>
            Finalize Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

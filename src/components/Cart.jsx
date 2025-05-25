import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handlePurchase = () => {
    Swal.fire({
      icon: 'success',
      title: '🎉 Purchase Complete!',
      text: 'Thank you for your order.',
      confirmButtonText: 'Close',
    });
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be removed from your cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        Swal.fire('Removed!', 'Item has been removed from your cart.', 'success');
      }
    });
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
              <button onClick={() => handleRemove(item.id)}>🗑 Remove</button>
            </div>
          ))}
          <button onClick={handlePurchase} style={{ marginTop: '20px' }}>
            ✅ Finalize Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

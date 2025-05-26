import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  itemBox: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginBottom: '15px',
    padding: '15px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
  },
  image: {
    width: '100px',
    borderRadius: '5px',
  },
  itemDetails: {
    flexGrow: 1,
  },
  quantityInput: {
    marginTop: '5px',
    padding: '5px',
    width: '60px',
  },
  removeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  purchaseButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

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
    <div style={styles.container}>
      {/* Add CSS for back-button here */}
      <style>{`
        .back-button {
          display: inline-block;
          padding: 8px 16px;
          background-color: rgb(2, 2, 2);
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.3s ease, box-shadow 0.2s ease;
          border: none;
          text-align: center;
        }
        .back-button:hover,
        .back-button:focus {
          background-color: rgb(227, 28, 28);
          box-shadow: 0 0 8px rgba(2, 2, 2, 0.6);
          outline: none;
        }
      `}</style>

      <h2 style={styles.heading}>Shopping Cart</h2>
      <Link to="/" className="back-button">← Back to Products</Link>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={styles.itemBox}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <label>Quantity: </label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  style={styles.quantityInput}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />
                <br />
                <button style={styles.removeButton} onClick={() => handleRemove(item.id)}>🗑 Remove</button>
              </div>
            </div>
          ))}
          <button style={styles.purchaseButton} onClick={handlePurchase}>
            ✅ Finalize Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

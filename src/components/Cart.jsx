import React, { useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../style/index.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const receiptRef = useRef();

  const generateReceiptContent = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const timeString = currentDate.toLocaleTimeString();

    const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const tax = total * 0.1;
    const grandTotal = total + tax;

    return `
      <div style="max-width:600px; margin:0 auto; font-family:Arial, sans-serif; padding:20px;">
        <div style="text-align:center; margin-bottom:20px;">
          <h1 style="margin-bottom:5px; color:#333;">Tech Haven 🛒</h1>
          <p style="margin:5px 0; color:#666;">123 Tech Street, Silicon Valley</p>
          <p style="margin:5px 0; color:#666;">Phone: (555) 123-4567</p>
        </div>

        <hr style="border-top:2px dashed #ccc; margin:15px 0;">

        <div style="margin-bottom:15px;">
          <p style="margin:5px 0;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin:5px 0;"><strong>Day:</strong> ${dayOfWeek}</p>
          <p style="margin:5px 0;"><strong>Time:</strong> ${timeString}</p>
          <p style="margin:5px 0;"><strong>Receipt #:</strong> ${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
        </div>

        <hr style="border-top:1px solid #eee; margin:15px 0;">

        <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
          <thead>
            <tr style="border-bottom:1px solid #ddd;">
              <th style="text-align:left; padding:8px;">Item</th>
              <th style="text-align:center; padding:8px;">Qty</th>
              <th style="text-align:right; padding:8px;">Price</th>
              <th style="text-align:right; padding:8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr key="${item.id}" style="border-bottom:1px solid #eee;">
                <td style="padding:8px;">${item.name}</td>
                <td style="text-align:center; padding:8px;">${item.quantity}</td>
                <td style="text-align:right; padding:8px;">$${item.price?.toFixed(2)}</td>
                <td style="text-align:right; padding:8px;">$${((item.price || 0) * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <hr style="border-top:2px dashed #ccc; margin:15px 0;">

        <div style="text-align:right; margin-bottom:20px;">
          <p style="margin:5px 0;"><strong>Subtotal:</strong> $${total.toFixed(2)}</p>
          <p style="margin:5px 0;"><strong>Tax (10%):</strong> $${tax.toFixed(2)}</p>
          <p style="margin:5px 0; font-size:18px;"><strong>Grand Total:</strong> $${grandTotal.toFixed(2)}</p>
        </div>

        <hr style="border-top:1px solid #eee; margin:15px 0;">

        <div style="text-align:center; margin-top:30px; color:#666;">
          <p>Thank you for shopping with us!</p>
          <p>Please come again</p>
          <p style="margin-top:10px; font-size:14px;">
            <em>For returns or exchanges, please present this receipt within 30 days</em>
          </p>
        </div>
      </div>
    `;
  };

  const handlePrint = () => {
    const content = generateReceiptContent();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { margin: 0; padding: 0; }
            @media print {
              @page { margin: 0; }
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          ${content}
          <script>
            setTimeout(function() {
              window.print();
              window.close();
            }, 100);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Your cart is empty',
        text: 'Add some products before purchasing.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '🎉 Purchase Complete!',
      text: 'Thank you for your order.',
      confirmButtonText: 'Print Receipt',
    }).then((result) => {
      if (result.isConfirmed) {
        handlePrint();
        clearCart();
      }
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

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <>
      <style>{`
        .top-nav {
          position: fixed;
          top: 10px;
          right: 10px;
          display: flex;
          gap: 10px;
          z-index: 1000;
        }

        .nav-button {
          background-color: rgb(77, 75, 219);
          color: white;
          padding: 8px 14px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease;
        }

        .nav-button:hover {
          background-color: #007bff;
        }

        .cart-container {
          padding: 20px;
          max-width: 800px;
          margin: 60px auto 20px;
          font-family: Arial, sans-serif;
        }

        .cart-item {
          border: 1px solid #ccc;
          border-radius: 10px;
          margin-bottom: 15px;
          padding: 15px;
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .cart-item-image {
          width: 100px;
          border-radius: 5px;
        }

        .cart-item-details {
          flex-grow: 1;
        }

        .quantity-input {
          margin-top: 5px;
          padding: 5px;
          width: 60px;
        }

        .remove-button {
          margin-top: 10px;
          padding: 5px 10px;
          background-color: #dc3545;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .purchase-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #28a745;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
        }

        .back-button {
          display: inline-block;
          padding: 8px 16px;
          background-color: rgb(2, 2, 2);
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.2s ease;
          border: none;
          margin-bottom: 20px;
        }

        .back-button:hover {
          background-color: rgb(227, 28, 28);
          box-shadow: 0 0 8px rgba(2, 2, 2, 0.6);
        }
      `}</style>

      <div className="top-nav">
        <Link to="/cart">
          <button className="nav-button">🛒 View Cart</button>
        </Link>
        <Link to="/account">
          <button className="nav-button">👤 Login</button>
        </Link>
        <Link to="/account">
          <button className="nav-button">✏️ Edit Account</button>
        </Link>
        <Link to="/comments">
          <button className="nav-button">💬 Comments</button>
        </Link>
      </div>

      <div className="cart-container">
        <Link to="/" className="back-button">← Back to Products</Link>
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {item.image && <img src={item.image} alt={item.name} className="cart-item-image" />}
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  {item.description && <p>{item.description}</p>}
                  <label>Quantity: </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="quantity-input"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  />
                  <br />
                  <button className="remove-button" onClick={() => handleRemove(item.id)}>
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}

            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="purchase-button" onClick={handlePurchase}>
              ✅ Finalize Purchase
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
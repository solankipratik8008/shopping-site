import React, { useRef } from 'react';
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
  },
};

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
    <div style={styles.container}>
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
          margin-bottom: 20px;
        }
        .back-button:hover,
        .back-button:focus {
          background-color: rgb(227, 28, 28);
          box-shadow: 0 0 8px rgba(2, 2, 2, 0.6);
          outline: none;
        }
      `}</style>

      <Link to="/" className="back-button">← Back to Products</Link>
      <h2 style={styles.heading}>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={styles.itemBox}>
              {item.image && <img src={item.image} alt={item.name} style={styles.image} />}
              <div style={styles.itemDetails}>
                <h3>{item.name}</h3>
                {item.description && <p>{item.description}</p>}
                <label>Quantity: </label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  style={styles.quantityInput}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                />
                <br />
                <button style={styles.removeButton} onClick={() => handleRemove(item.id)}>🗑 Remove</button>
              </div>
            </div>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>
          <button style={styles.purchaseButton} onClick={handlePurchase}>
            ✅ Finalize Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
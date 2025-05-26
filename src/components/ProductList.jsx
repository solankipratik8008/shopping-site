import React, { useState } from 'react';
import headphonesImg from '../assets/Headphone.jpg';
import watchImg from '../assets/watch.jpg';
import speakerImg from '../assets/speaker.jpg';
import caseImg from '../assets/Case.jpg';
import standImg from '../assets/stand.jpg';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import '../style/index.css';

const products = [
  { id: 1, name: "Wireless Headphones", image: headphonesImg, description: "High quality wireless headphones." },
  { id: 2, name: "Smart Watch", image: watchImg, description: "Track your health and notifications." },
  { id: 3, name: "Bluetooth Speaker", image: speakerImg, description: "Portable speaker with deep bass." },
  { id: 4, name: "Phone Case", image: caseImg, description: "Shockproof case for all phones." },
  { id: 5, name: "Laptop Stand", image: standImg, description: "Ergonomic aluminum stand." },
];

const ProductList = () => {
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  const handleChange = (e, id) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantities({ ...quantities, [id]: value });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);

    Swal.fire({
      icon: 'success',
      title: `${product.name}`,
      text: `Added ${qty} item(s) to cart!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <>
      {/* Navigation Buttons at Top Right */}
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
          background-color:rgb(77, 75, 219);
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

      {/* Main Content */}
      <div className="product-list-container">
        <header className="product-list-header">
          <h2>Product List</h2>
        </header>

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="quantity-control">
                  <label htmlFor={`qty-${product.id}`}>Qty:</label>
                  <input
                    id={`qty-${product.id}`}
                    type="number"
                    min="1"
                    className="quantity-input"
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleChange(e, product.id)}
                  />
                </div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default ProductList;

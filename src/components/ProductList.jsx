import React, { useState } from 'react';
import headphonesImg from '../assets/Headphone.jpg';
import watchImg from '../assets/watch.jpg';
import speakerImg from '../assets/speaker.jpg';
import caseImg from '../assets/Case.jpg';
import standImg from '../assets/stand.jpg';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../components/Footer'; // ✅ Correct way to import Footer
import '../style/index.css';

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: headphonesImg,
    description: "High quality wireless headphones.",
  },
  {
    id: 2,
    name: "Smart Watch",
    image: watchImg,
    description: "Track your health and notifications.",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: speakerImg,
    description: "Portable speaker with deep bass.",
  },
  {
    id: 4,
    name: "Phone Case",
    image: caseImg,
    description: "Shockproof case for all phones.",
  },
  {
    id: 5,
    name: "Laptop Stand",
    image: standImg,
    description: "Ergonomic aluminum stand.",
  },
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
      <div className="product-list-container">
        <div className="product-list-header">
          <h2>Product List</h2>
          <div className="nav-buttons">
            <Link to="/cart">
              <button className="nav-button">🛒 View Cart</button>
            </Link>
            <Link to="/account">
              <button className="nav-button">👤 Create Account</button>
            </Link>
            <Link to="/account">
              <button className="nav-button">✏️ Edit Account</button>
            </Link>
            <Link to="/comments">
              <button className="nav-button">💬 Comments</button>
            </Link>
          </div>
        </div>

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

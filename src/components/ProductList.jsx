import React, { useState } from 'react';
import headphonesImg from '../assets/Headphone.jpg';
import watchImg from '../assets/watch.jpg';
import speakerImg from '../assets/speaker.jpg';
import caseImg from '../assets/Case.jpg';
import standImg from '../assets/stand.jpg';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';


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
    setQuantities({ ...quantities, [id]: e.target.value });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, parseInt(qty));
    alert(`Added ${qty} of ${product.name} to cart`);
  };

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/cart">
    <button>🛒 View Cart</button>
  </Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: 10, width: 200 }}>
            <img src={product.image} alt={product.name} width="100%" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <input
              type="number"
              min="1"
              value={quantities[product.id] || 1}
              onChange={(e) => handleChange(e, product.id)}
            />
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

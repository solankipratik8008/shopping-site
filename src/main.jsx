import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Cart from './components/Cart';
import UserForm from './components/UserForm';
import CommentPage from './components/CommentPage'; 
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { CommentProvider } from './context/CommentContext';
import './style/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <CartProvider>
      <CommentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<UserForm />} />
            <Route path="/comments" element={<CommentPage />} /> {/* ✅ FIXED */}
          </Routes>
        </BrowserRouter>
      </CommentProvider>
    </CartProvider>
  </UserProvider>


);

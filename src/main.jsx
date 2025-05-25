import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Cart from './components/Cart';
import UserForm from './components/UserForm'; // ✅ Make sure this is added
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext'; // ✅ Only ONE import

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<UserForm />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </UserProvider>
);

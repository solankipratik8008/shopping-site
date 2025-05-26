import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserForm = () => {
  const { user, saveUser } = useUser();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: '' }); // Pre-fill but don't keep password
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(formData);

    Swal.fire({
      icon: 'success',
      title: 'Account Saved!',
      text: user ? 'Your account details were updated.' : 'Your account has been created.',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="user-form-page">
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

        .user-form-page {
          max-width: 700px;
          margin: 5rem auto 2rem; /* Increased top margin for nav */
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        
        .user-form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .user-form-page h2 {
          color:rgb(255, 255, 255);
          font-size: 1.8rem;
          margin: 0;
        }
        
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background-color: #2c3e50;
          color: white;
          border-radius: 6px;
          transition: all 0.3s ease;
          text-decoration: none;
          font-weight: 500;
        }
        
        .back-button:hover {
          background-color: #1a252f;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .user-form {
          margin: 2rem 0;
          padding: 1.5rem;
          border-radius: 10px;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .account-details {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }
        
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border 0.3s ease;
          background: white;
        }
        
        .form-control:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 3px rgba(52,152,219,0.2);
        }
        
        textarea.form-control {
          min-height: 120px;
          resize: vertical;
          background: white;
        }
        
        .submit-btn {
          background: #27ae60;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
          background: #219653;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(39,174,96,0.2);
        }
        
        .password-note {
          font-size: 0.85rem;
          color: #95a5a6;
          margin-top: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .user-form-page {
            padding: 1rem;
          }
          
          .user-form-header {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      {/* Add the navigation bar */}
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

      <div className="user-form-header">
        <h2>Account Details</h2>
        <Link to="/" className="back-button" aria-label="Go Back">
          ← Back to Products
        </Link>
      </div>

      <div className="account-details">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Shipping Address</label>
            <textarea
              id="address"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
            <p className="password-note">Only enter if you want to change your password</p>
          </div>

          <button type="submit" className="submit-btn">
            {user ? 'Update Account' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
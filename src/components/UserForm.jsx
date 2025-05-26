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
    <div className="user-form-container">
      <style>{`
        .user-form-container {
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .user-form-container h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .user-form-container a {
          display: inline-block;
          margin-bottom: 20px;
          color: #007bff;
          text-decoration: none;
        }

        .user-form-container form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .user-form-container form div {
          display: flex;
          flex-direction: column;
        }

        .user-form-container label {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .user-form-container input,
        .user-form-container textarea {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }

        .user-form-container textarea {
          resize: vertical;
          min-height: 60px;
        }

        .user-form-container button {
          padding: 10px;
          background-color: #28a745;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }

        .user-form-container button:hover {
          background-color: #218838;
        }

                .link-button {
  display: inline-block;
  padding: 8px 16px;
  background-color:rgb(2, 2, 2); /* blue */
  color: white;
  text-decoration: none; /* remove underline */
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  border: none;
  text-align: center;
}

.link-button:hover,
.link-button:focus {
  background-color:rgb(227, 28, 28); /* darker blue */
  box-shadow: 0 0 8px rgba(2, 2, 2, 0.6);
  outline: none;
}

      `}</style>

      <h2>Account Details</h2>
      <Link to="/" className="link-button">← Back to Products</Link>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Shipping Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Password (optional):</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Save Account</button>
      </form>
    </div>
  );
};

export default UserForm;

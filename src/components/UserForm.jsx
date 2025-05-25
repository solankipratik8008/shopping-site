import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

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
      setFormData({ ...user, password: '' }); // Don't persist password
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(formData);
    alert('✅ Account saved!');
  };
 

  return (
    <div>
      <h2>Account Details</h2>
      <Link to="/">← Back to Products</Link>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Shipping Address:</label><br />
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Password (optional):</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Save Account</button>
      </form>
    </div>
    
  );

};

export default UserForm;

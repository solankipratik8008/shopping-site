import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

/**
 * User Context Provider with consistent styling patterns
 * 
 * Features:
 * - Persists user data to localStorage
 * - Provides user state management
 * - Follows the same design system as other components
 * 
 * Usage:
 * Wrap your app with <UserProvider> and use useUser() hook in components
 * 
 * Styling Notes:
 * - Matches the color scheme: #2c3e50, #27ae60, #e74c3c
 * - Uses same transition timing: 0.3s ease
 * - Consistent with other components' design patterns
 */
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Style-related constants that match your design system
  const styleConstants = {
    colors: {
      primary: '#2c3e50',
      success: '#27ae60',
      danger: '#e74c3c',
    },
    transitions: 'all 0.3s ease',
    borderRadius: '6px',
  };

  const [user, setUser] = useState(() => {
    // Try loading from localStorage
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return null;
    }
  });

  const saveUser = (data) => {
    try {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Show notification if this is a login action
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back, ${data.name || 'User'}!`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Failed to save user data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save user data',
      });
    }
  };

  const logout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: styleConstants.colors.danger,
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        saveUser(null);
        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
      }
    });
  };

  // Add these values to the context
  const contextValue = {
    user,
    saveUser,
    logout,
    styleConstants, // Make styling constants available to consumers
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Helper component for development - shows current user state
 * Remove in production or wrap in __DEV__ check
 */
const UserDebug = () => {
  const { user } = useUser();
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      padding: '10px',
      background: '#2c3e50',
      color: 'white',
      borderRadius: '6px',
      fontSize: '12px',
      zIndex: 1000,
    }}>
      <strong>User State:</strong> {user ? JSON.stringify(user) : 'Not logged in'}
    </div>
  );
};
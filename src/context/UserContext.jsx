import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try loading from localStorage
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const saveUser = (data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

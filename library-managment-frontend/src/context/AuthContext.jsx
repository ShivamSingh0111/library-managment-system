import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    // In a real app, this would come from your backend
    const userWithRole = {
      ...userData,
      role: userData.email === 'admin@library.com' || userData.isAdmin ? 'Admin' : 'User',
      isAdmin: userData.email === 'admin@library.com' || userData.isAdmin
    };
    setUser(userWithRole);
    localStorage.setItem('user', JSON.stringify(userWithRole));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.role === 'Admin' || user?.isAdmin;
  };

  const getUserRole = () => {
    return user?.role || 'Guest';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin,
      getUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

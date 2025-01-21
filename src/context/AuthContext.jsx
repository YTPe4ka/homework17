import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children, setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

const login = async (username, password) => {
    try {
      const response = await api.post('https://nt-shopping-list.onrender.com/api/auth', { username, password }); 
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

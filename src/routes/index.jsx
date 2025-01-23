import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const AppRoutes = ({ isAuthenticated }) => (
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    
  </Routes>
);

export default AppRoutes;

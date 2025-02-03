import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, Outlet, Link } from 'react-router-dom';
import Sidebar from '../Profile/Sidebar';
import './Home.css';  


const Home = () => {
  const { login, user } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  
  if (!user && !token) {
  return <Navigate to="/login" />;
  }

  return (
  <div className="layout">
    <nav className="navbar">
<div className="navbar-content">
  <Link to="/home" className="logo">Logo</Link>
              
  <input type="text" className="search-bar" placeholder="Search..." />
  <button
    className="logout-btn"
    onClick={() => {
      localStorage.removeItem('token');
      window.location.reload();
    }}
  >
    Logout
    </button>
    </div>
    </nav>
        <div className='Common-Classes'>
      <Sidebar />
         <Outlet />
      </div>
    </div>
  );
};

export default Home;

import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './Home.css'
const Home = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    localStorage.getItem('token'); 
    return <Navigate to='/login' />;
  }
  return (
    <div className="home">  
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Logo</div>
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
      </nav>
      <main className="main-content">
        <h1>Welcome, {user?.name}!</h1>
        <p>This is the main page after login.</p>
      </main>
    </div>
  );
};

export default Home;

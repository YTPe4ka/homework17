import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [bruh, setbruh] = useState(false);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (!user && !token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Logo</div>
          <input type="text" className="search-bar" placeholder="Search..." />
          <div>
            <ul className="nav-links"></ul>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem('token');
                setbruh(!true);
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="layout">
        <aside className="sidebar">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#settings">Settings</a></li>
            <li><a href="#help">Help</a></li>
          </ul>
        </aside>
        <main className="main-content">
          <h1>Welcome, {user?.name || 'ghost'}!</h1>
          <p>This is the main page after login.</p>
        </main>
      </div>
    </div>
  );
};

export default Home;

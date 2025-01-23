import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import './app.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <AuthProvider setIsAuthenticated={setIsAuthenticated}>
        <AppRoutes isAuthenticated={isAuthenticated} />
      </AuthProvider>
    </Router>
  );
};

export default App;

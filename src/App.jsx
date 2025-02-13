import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import GroupDetails from './components/Groups/GroupDetails';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Register.jsx';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/Home/Profile.jsx';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Home />}>
            <Route path="/home/group/:groupID" element={<GroupDetails />} />
            <Route path="/home" element={<Profile/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<Navigate to="/login" />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;


//he he :> 
// iqbol0797 I030797
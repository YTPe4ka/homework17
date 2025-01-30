import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import GroupDetails from './components/Groups/GroupDetails';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Register.jsx';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />}>
            <Route path="/home/group/:groupId" element={<GroupDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

//he he :> 
// iqbol0797 I030797
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile'; 
import Logout from './components/Logout'; 
import Sidebar from './components/Sidebar'; 
import DriverDashboard from './components/DriverDashboard'; 

import './style.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/driverdashboard" element={<DriverDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
// application's routing using the react-router-dom library.<br/> It defines routes for your different components: LoginForm, SignUpForm, Dashboard, Profile, and Logout. The Sidebar component is also rendered within the main container, assuming it provides navigation links.//
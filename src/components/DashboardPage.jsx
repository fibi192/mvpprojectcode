import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Logout from './Logout';

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h1>Dashboard</h1>
        <ul>
          <li><Link to="/dashboard" className="active">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <Router>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default DashboardPage;

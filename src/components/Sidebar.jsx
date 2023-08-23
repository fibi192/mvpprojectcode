import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showNavigation = ['/dashboard', '/profile', '/logout'];
  const showSidebar = !['/login', '/signup'].includes(location.pathname);

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing session, tokens, etc.)

    // Navigate to the LoginForm after logout
    navigate('/LoginForm.jsx');
  };

  const handleDashboardClick = () => {
    // Navigate to the Dashboard
    navigate('/dashboard');
  };

  const handleProfileClick = () => {
    // Navigate to the Profile page
    navigate('/profile');
  };
  const handleLoginFormClick = () => {
    // Navigate to the LoginForm page
    navigate('/LoginForm');
  };
  const handleDriverDashboardClick = () => {
    // Navigate to the DriverDashboard page
    navigate('/DriverDashboard');
  };
  
  return (
    showSidebar && (
      <nav className="sidebar">
        <div className="logo">
          <img src="/src/images/my-logo.png" alt="Logo" />
        </div>
        {showNavigation.includes(location.pathname) && (
          <>
            <h5 className="welcome">Welcome the  App</h5>
            <ul>
              <li>
                {/* Use a button to navigate to the Dashboard */}
                <button onClick={handleDashboardClick}>Dashboard</button>
              </li><br></br><br></br>
              <li>
                {/* Use a button to navigate to the Profile page */}
                <button onClick={handleProfileClick}>Profile</button>
              </li><br></br><br></br>
                <li>
                {/* Use a button to navigate to the Driver Dashboard page */}
                <button onClick={handleDriverDashboardClick}>Driver Dashboard</button>
              </li><br></br><br></br>
              <li>
                {/* Use the handleLogout function to handle logout */}
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </>
        )}
      </nav>
    )
  );
};

export default Sidebar;

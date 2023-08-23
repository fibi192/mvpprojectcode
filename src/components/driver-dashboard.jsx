import React, { useState } from 'react';
import './style.css';

const DriverDashboard = () => {
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);

  const handleLogout = () => {
    // Log the driver out of the dashboard
  };

  return (
    <div className="content">
      <h1>Driver Dashboard</h1>
      <div>
        <h2>Upcoming Rides</h2>
        <ul>
          {upcomingRides.map((ride, index) => (
            <li key={index}>
              <h3>Ride {index + 1}</h3>
              <p>Pickup: {ride.pickupLocation}</p>
              <p>Destination: {ride.destinationLocation}</p>
              <p>Fare: UGX {ride.fare}</p>
            </li>
          ))}
        </ul>

        <h2>Completed Rides</h2>
        <ul>
          {completedRides.map((ride, index) => (
            <li key={index}>
              <h3>Ride {index + 1}</h3>
              <p>Pickup: {ride.pickupLocation}</p>
              <p>Destination: {ride.destinationLocation}</p>
              <p>Fare: UGX {ride.fare}</p>
            </li>
          ))}
        </ul>

        <a href="/completedRiders">Completed Rides</a>
        <a href="/logout">Logout</a>
      </div>
    </div>
  );
};

export default DriverDashboard;

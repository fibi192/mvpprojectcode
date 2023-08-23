import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const DriverDashboard = () => {
  const [pendingRiders, setPendingRiders] = useState([]);
  const completedRiders = [];

  const handleCheckout = (riderId) => {
    
    completedRiders = completedRiders.filter(rider => rider.id !== riderId);
  };

  useEffect(() => {
    // Fetch pending  riders data from the server
    fetch("http://localhost:1337/api/homes",{DriverDashboard, method:"GET"}) 
      .then(response => response.json())
      .then(data => {
        console.log(data);
       setPendingRiders(data.data);
        //setPendingRiders(Array.from(data));
      });
  }, []);

  return (
    <div className="driver-dashboard">
      <h2>Pending Riders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>Rider ID</th>
            <th>Rider Types</th>
            <th>Pickup Location</th>
            <th>Destination</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {pendingRiders && pendingRiders.map(rider => (
            // Here is where you will render the information for each rider
            <tr key={rider.id}>
              <td><input type="checkbox" /></td>
              <td>{rider.id}</td>
              <td>{rider.attributes.rideTypes}</td>
              <td>{rider.attributes.pickupLocation}</td>
              <td>{rider.attributes.destinationLocation}</td>
              <td>{rider.attributes.updatedAt }</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Completed Riders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Rider ID</th>
            <th>Pickup Location</th>
            <th>Destination</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {completedRiders && completedRiders.map(rider => (
            // Here is where you will render the information for each rider
            <tr key={rider.id}>
              <td>{rider.id}</td>
              <td>{rider.pickupLocation}</td>
              <td>{rider.destinationLocation}</td>
              <td>{rider.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => {
          window.location.href = '/Loginform';
    }}>Logout</button>
    </div>
  );
};

export default DriverDashboard;
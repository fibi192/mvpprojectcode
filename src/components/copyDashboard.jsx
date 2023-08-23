import React, { useState } from 'react';
import LocationPicker from './LocationPicker';
import './style.css';

const Dashboard = () => {
  const [pickup, setPickup] = useState({ latitude: 0.3136, longitude: 32.5811 }); // Kampala coordinates
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(0);

  const handlePickupChange = (newLocation) => {
    setPickup(newLocation);
  };

  const handleDestinationChange = (newLocation) => {
    setDestination(newLocation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the distance between pickup and destination
    const apiKey = 'AIzaSyA0BBrfH8o291314ufGNbM2zaTNNte2dFQ'; // Replace with your API key
    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${pickup.latitude},${pickup.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${apiKey}`);
    const data = await response.json();

    // Extract the distance value from the response
    const distance = data?.rows[0]?.elements[0]?.distance?.value || 0;

    // Calculate the transport fare based on the distance (assuming 1 km costs 1000 UGX)
    const transportFare = distance * 0.001 * 1000;
    setFare(transportFare);
  };

  return (
    <div className="content">
      <h1> Welcome to Your Dashboard</h1>
      <div>
        <form id="login-form2" onSubmit={handleSubmit}>
          <label htmlFor="ride">Select Ride</label>
          <select id="ride" name="ride">
            <option value="MyCar">My Car</option>
            <option value="Bus">Bus</option>
            <option value="BodaBoda">Boda Boda</option>
            <option value="TukuTuku">Tuku Tuku</option>
          </select>

          <label htmlFor="pickup">Select Pickup Location</label>
          <LocationPicker
            containerElement={<div style={{ height: '300px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            defaultPosition={pickup} // Default position set to Kampala, Uganda
            onChange={handlePickupChange}
            value={pickup}
            onChangeValue={setPickup}
          />

          <label htmlFor="destination">Select Destination</label>
          <LocationPicker
            containerElement={<div style={{ height: '300px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            defaultPosition={destination} // Default position set to an empty location
            onChange={handleDestinationChange}
            value={destination}
            onChangeValue={setDestination}
          />

              <label htmlFor="fare">Transport Fare</label>
              <input type="text" id="fare" name="fare" value={`UGX ${fare}`} readOnly />
               <button type="submit">Confirm</button>

        </form>
      </div>
    </div>
  );
};

export default Dashboard;

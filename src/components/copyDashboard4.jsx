
const apiKey = 'AIzaSyCTnzRNClz_CLQ9A8ZLNaWr1eYO5W_2x6E';
const farePerKm = 1000; // Change this value to your desired fare per kilometer
import React, { useState } from 'react';
//import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { createRideBooking } from './RideService';
import './style.css';
import PlacesAutocomplete from 'react-google-places-autocomplete';
const Dashboard = () => {
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(0);
  const [pickup, setPickup] = useState('');
  const [ride, setRide] = useState('MyCar'); // <-- Here is the initialization

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const calculateDistanceAndFare = async () => {
    try {
      // Get the latitude and longitude of pickup and destination
      const pickupLatLng = `${pickup.geometry.location.lat},${pickup.geometry.location.lng}`;
      const destinationLatLng = `${destination.geometry.location.lat},${destination.geometry.location.lng}`;

      // Calculate the distance between pickup and destination
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${pickupLatLng}&destinations=${destinationLatLng}&key=${apiKey}`
      );
      const data = await response.json();

      // Extract the distance value from the response
      const distance = data?.rows[0]?.elements[0]?.distance?.value || 0;

      // Calculate the transport fare based on the distance and fare per km
      const transportFare = distance * farePerKm;
      setFare(transportFare);

      // Return the newBooking object
      return {
        pickupLocation: pickup.formatted_address,
        destinationLocation: destination.formatted_address,
        fare: transportFare,
      };
    } catch (error) {
      console.error('Error calculating distance and fare:', error.message);
      throw error;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data here...
  };

 
    return (
      <div className="content">
        <h1>Welcome to Your Dashboard</h1>
        <div>
          <form id="login-form2" onSubmit={handleSubmit}>
            <label htmlFor="ride">Select Ride</label>
            <select id="ride" name="ride" value={ride} onChange={setRide}>
              <option value="MyCar">My Car</option>
              <option value="Bus">Bus</option>
              <option value="BodaBoda">Boda Boda</option>
              <option value="TukuTuku">Tuku Tuku</option>
            </select>
    
            <label htmlFor="pickup">Select Pickup Location</label>
            <input
              type="text"
              id="pickup"
              name="pickup"
              value={pickup}
              onChange={handlePickupChange}
            />
    
            <label htmlFor="destination">Select Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={destination}
              onChange={handleDestinationChange}
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

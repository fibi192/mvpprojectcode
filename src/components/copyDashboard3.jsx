
const apiKey = 'AIzaSyAeiZiydiikD_fvskknbAFQ6ffduJU8qIw';
import React, { useState } from 'react';
//import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { createRideBooking } from './RideService';
import './style.css';
import PlacesAutocomplete from 'react-google-places-autocomplete';

const Dashboard = () => {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [fare, setFare] = useState(0);

  const handlePickupChange = async (Place) => {
    setPickup(Place);
    console.log('Selected Pickup:', place);
  };

  const handleDestinationChange = (place) => {
    setDestination(place);
    console.log('Selected Destination:', place);
  }

    const calculateDistanceAndFare = async (rideType) => {
    try {
      // Calculate the distance between pickup and destination
      //const apiKey = 'AIzaSyAeiZiydiikD_fvskknbAFQ6ffduJU8qIw';
      const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=<span class="math-inline">\{pickup\.latitude\},</span>{pickup.longitude}&destinations=<span class="math-inline">\{destination\.latitude\},</span>{destination.longitude}&key=${apiKey}`);
    const data = await response.json();

      // Extract the distance value from the response
      const distance = data?.rows[0]?.elements[0]?.distance?.value || 0;

      // Calculate the transport fare based on the distance (assuming 1 km costs 1000 UGX)
      const transportFare = distance * 0.001 * 1000;
      setFare(transportFare);

      // Return the newBooking object
      return {
        rideType,
        pickupLocation: { latitude: pickup.latitude, longitude: pickup.longitude },
        destinationLocation: { latitude: destination.latitude, longitude: destination.longitude },
        fare: transportFare,
      };
    } catch (error) {
      // Handle error
      console.error('Error calculating distance and fare:', error.message);
      throw error; // Rethrow the error to be caught by the calling function
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected Pickup:', pickup);
    console.log('Selected Destination:', destination);
    try {
      const newBookingData = await calculateDistanceAndFare();

      const response = await createRideBooking(newBookingData);

      // Successfully created the booking entry
      console.log('Booking created:', response);
    } catch (error) {
      // Handle error
      console.error('Error creating booking:', error.message);
    }
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
          <PlacesAutocomplete
            value={pickup}
            onChange={handlePickupChange}
            onSelect={handlePickupChange}
            apiKey={apiKey}
          />

           <label htmlFor="destination">Select Destination</label>
           <PlacesAutocomplete
            value={destination}
            onChange={handleDestinationChange}
            onSelect={handleDestinationChange}
            apiKey={apiKey}
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

const apiKey = 'AIzaSyBKPN5K7poQadUq9PIZrOqiKzJpeL3jYjQ'
const farePerKm = 1000; // Change this value to your desired fare per kilometer
import React, { useState } from 'react';
import { createRideBooking } from './RideService';
import './style.css';
import PlacesAutocomplete from 'react-google-places-autocomplete';

const calculateTransportFare = () => {
    // Use the Distance Matrix API to get the distance between the pickup and destination locations
  const origins = pickup;
  const destinations = destination;

  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=<span class="math-inline">\{origins\}&destinations\=</span>{destinations}&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Extract data from 'data' JSON object
      const distances = data.rows[0].elements.map(element => element.distance.text);
      const durations = data.rows[0].elements.map(element => element.duration.text);

      // Calculate the transport fare based on the distance and fare per km
      const transportFare = distances[0] * farePerKm;
      setFare(transportFare);
      return transportFare;
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const rideTypes = [
  {
    id: 1,
    name: "Bus",
  },
  {
    id: 2,
    name: "Taxi",
  },
  {
    id: 3,
    name: "Boda Boda",
  },
];
const Dashboard = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(0);
  const [ride, setRide] = useState('');
  //const [email, setEmail] = useState('');

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected Pickup:', pickup);
    console.log('Selected Destination:', destination);
    console.log('Select Ride:', e.target.elements['ride'].value);
    console.log('Select Ride:', ride);
    //console.log('Email:', email);

        const newBookingData ={
          rideTypes: ride,
          pickupLocation: pickup,
          destinationLocation: destination,
          fare: 20000,
        };
     
     

    try {
      const response = await fetch('http://localhost:1337/api/homes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Other headers if needed
        },
        body: JSON.stringify(newBookingData), // Your booking data object
      });
//console.log(newBookingData);
      if (response.ok) {
        const responseData = await response.json();
        console.log('Booking created:', responseData);
        // Do something with the successful response, like showing a success message

        // Send the confirmation email
        const emailService = new EmailService();
        emailService.sendEmail(
          email,
          'Ride Booking Confirmation',
          'Your ride booking has been confirmed!',
          'Your booking details are as follows:',
          `
            Pickup location: ${pickup}
            Destination location: ${destination}
            Fare: UGX ${fare}

            You can view your booking details here: ${responseData.bookingUrl}

            If you need to cancel your booking, please click here: ${responseData.cancelUrl}
          `
        );
      } else {
        console.error('Failed to create booking:', response.statusText);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {

      console.error('Error creating booking:', error);
      // Handle the error, show an error message, etc.
    }
  };
  
  return (
    <div className="content">
      <h1> Get a ride at your door  in minutes 24/7</h1>
      <div>
        <form id="login-form2" onSubmit={handleSubmit}>
        <label htmlFor="ride">Select Ride</label>
          <select id="ride" name="ride">
            {rideTypes.map((ride) => (
              <option key={ride.id} value={ride.name}>{ride.name}</option>
            ))}
          </select>

          <label htmlFor="pickup"> Pickup </label>
          <input
            type="text"
            id="pickup"
            name="pickup"
            value={pickup}
            onChange={handlePickupChange}
          />

          <label htmlFor="destination">Destination </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={destination}
            onChange={handleDestinationChange}
          />

          <label htmlFor="fare">All about Trip cost</label>
          <input type="text" id="fare" name="fare" value={`UGX ${fare}`} readOnly />

          <button type="submit">Find the driver</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

//const apiKey = 'AIzaSyBKPN5K7poQadUq9PIZrOqiKzJpeL3jYjQ'
//const farePerKm = 1000; // Change this value to your desired fare per kilometer
import React, { useState } from 'react';
//import { createRideBooking } from './RideService';
import './style.css';
//import PlacesAutocomplete from 'react-google-places-autocomplete';

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

  const handlefareChange = (e) => {
    setFare(e.target.value);
    //console.log('The value of fare is:', fare);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected Pickup:', pickup);
    console.log('Selected Destination:', destination);
    console.log('Select Ride:', e.target.elements['ride'].value);
    console.log('The value of fare is:', fare);
    
    if (!e.target.elements['ride'].value) {
      alert('Please select a ride type');
      return;
    }
    const newBookingData = {
      rideTypes: e.target.elements['ride'].value,
      pickupLocation: pickup,
      destinationLocation: destination,
      fare: fare,
    };
     
         try {
      const response = await fetch('http://localhost:1337/api/homes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Other headers if needed
        },
        body: JSON.stringify(
          {
            "data":newBookingData
          }), // Your booking data object
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Booking created:', responseData);
        // Do something with the successful response, like showing a success message
        // Show a pop-up message that says "Wait for the rider"
        window.alert('Wait for the  your rider');
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
      <option value="">Select a Ride Type</option>
      <option value="bus">Bus</option>
      <option value="taxi">Taxi</option>
      <option value="boda-boda">Boda Boda</option>
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
          <input
            type="text"
            id="fare"
            name="fare"
            value={fare}
            onChange={handlefareChange}
          />

          <button type="submit">Find the driver</button>
        </form>
          
      </div>
    </div>
  );
};

export default Dashboard;

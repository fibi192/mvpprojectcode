const API_URL = 'http://localhost:1337/api/homes'; // Update with your Strapi API URL

async function createRideBooking(bookingData) {
  try {
    const response = await fetch(`${API_URL}/ride-bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData)
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to create booking');
    }
  } catch (error) {
    throw new Error('API request error: ' + error.message);
  }
}

export { createRideBooking };

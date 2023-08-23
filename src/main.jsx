import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client" instead of "react-dom"
import App from './App';
import './style.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Access the API key from Vite's environment variables
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=weekly&callback=initMap`;
document.head.appendChild(script);

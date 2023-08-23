import React, { useState } from 'react';
import { GoogleMap, useLoadScriptLoadScript, Marker } from '@react-google-maps/api';

const LocationPicker = (props) => {
  const [position, setPosition] = useState({ latitude: 0.3136, longitude: 32.5811 }); // Kampala coordinates

  const handleMapClick = (event) => {
    // Disable map click to prevent selecting a new location
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <LoadScript
        googleMapsApiKey={props.apiKey || 'AIzaSyBKPN5K7poQadUq9PIZrOqiKzJpeL3jYjQ'}
        loadingElement={<div style={{ height: '100%' }} />}
      >
        <GoogleMap
          mapContainerStyle={{ height: '100%' }}
          center={{ lat: position.latitude, lng: position.longitude }}
          zoom={15}
          zoomControl={false} // Disable zoom control to prevent user from zooming out
          streetViewControl={false} // Disable street view control to prevent user from changing the view
          onClick={handleMapClick}
        >
          <Marker position={{ lat: position.latitude, lng: position.longitude }}
            draggable={false} // Disable marker drag to prevent user from moving the marker
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationPicker;


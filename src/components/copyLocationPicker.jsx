import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LocationPicker = (props) => {
  const [position, setPosition] = useState({ latitude: 0.3136, longitude: 32.5811 }); // Kampala coordinates

  const handleMapClick = (event) => {
    // Disable map click to prevent selecting a new location
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <LoadScript
        googleMapsApiKey={props.apiKey || 'AIzaSyA0BBrfH8o291314ufGNbM2zaTNNte2dFQ'}
        loadingElement={<div style={{ height: '100%' }} />}
      >
        <GoogleMap
          mapContainerStyle={{ height: '100%' }}
          center={{ lat: position.latitude, lng: position.longitude }}
          zoom={15}
          onClick={handleMapClick}
        >
          <Marker position={{ lat: position.latitude, lng: position.longitude }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationPicker;

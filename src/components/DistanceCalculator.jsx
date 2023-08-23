import React from "react";

const DistanceCalculator = ({ pickupLocation, destinationLocation }) => {
  
  
  // For demonstration purposes, let's assume a fixed distance of 10 kilometers
  const distanceInKm = 10;

  return (
    <div>
      <p>Distance: {distanceInKm} km</p>
    </div>
  );
};

export default DistanceCalculator;

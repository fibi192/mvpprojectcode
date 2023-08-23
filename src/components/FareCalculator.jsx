import React from "react";

const FareCalculator = ({ distanceInKm, farePerKm }) => {
  // Calculate the fare based on distance and fare per km
  const transportFare = distanceInKm * farePerKm;

  return (
    <div>
      <p>Transport Fare: UGX {transportFare}</p>
    </div>
  );
};

export default FareCalculator;

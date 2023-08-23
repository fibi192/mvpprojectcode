import React, { useState, useEffect } from 'react';

const Profile = ({ userData }) => {
  const [profileData, setProfileData] = useState(null); // State to hold user profile data

  useEffect(() => {
    // Fetch the user profile data
    const user = fetch('/api/users/me').then(response => response.json());

    // Set the fetched profile data in state
    setProfileData(user);
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {profileData && (
        <div>
          <p>Name: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          <p>Phonenumber: {profileData.phonenumber}</p>

          {/* Display other user details as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;

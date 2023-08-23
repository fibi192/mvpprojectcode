import React, { useState, useEffect } from 'react';

const Profile = ({ userData }) => {
  const [profileData, setProfileData] = useState(null); // State to hold user profile data
  const [userId, setUserId] = useState(null); // State to hold user id

  useEffect(() => {
    // Fetch the user profile data
    if (userId) {
      fetch(`http://localhost:1337/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
          // Set the fetched profile data in state
          setProfileData(user);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);
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

// UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userProfile.css'; // Import your CSS file for styling


const UserProfile = ({userIdd}) => {
  const [user, setUser] = useState(null);
    
    const userId = localStorage.getItem('userId');
  useEffect(() => {
   

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}`);
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      
      <div className="profile-info">
      
        <div>
        <h1>User Profile</h1>
          <p>Full Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>Birthday: {user.birthday}</p>
          <p>Gender: {user.gender}</p>
          <p>Status: {user.status}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

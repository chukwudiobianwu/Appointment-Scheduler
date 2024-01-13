import React, { useState } from 'react';
import axios from 'axios';

const Settings = ({ UserId }) => {
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const userId = localStorage.getItem('userId');

  const handleChangePassword = () => {
    // Make a request to the server to change the password
    axios.put(`http://localhost:3001/change-password/${userId}`, { newPassword })
      .then(response => {
        console.log(response.data);
        // Handle success or show a notification to the user
      })
      .catch(error => {
        console.error('Error changing password:', error);
        // Handle error or show a notification to the user
      });
  };

  const handleChangeUsername = () => {
    // Make a request to the server to change the username
    axios.put(`http://localhost:3001/change-username/${userId}`, { newUsername })
      .then(response => {
        console.log(response.data);
        // Handle success or show a notification to the user
      })
      .catch(error => {
        console.error('Error changing username:', error);
        // Handle error or show a notification to the user
      });
  };

  const handleChangeEmail = () => {
    // Make a request to the server to change the email
    axios.put(`http://localhost:3001/change-email/${userId}`, { newEmail })
      .then(response => {
        console.log(response.data);
        // Handle success or show a notification to the user
      })
      .catch(error => {
        console.error('Error changing email:', error);
        // Handle error or show a notification to the user
      });
  };

  const handleChangeFullName = () => {
    // Make a request to the server to change the full name
    axios.put(`http://localhost:3001/change-fullname/${userId}`, { newFullName })
      .then(response => {
        console.log(response.data);
        // Handle success or show a notification to the user
      })
      .catch(error => {
        console.error('Error changing full name:', error);
        // Handle error or show a notification to the user
      });
  };

  const handleDeleteAccount = () => {
    // Make a request to the server to delete the account
    axios.delete(`http://localhost:3001/delete-account/${userId}`)
      .then(response => {
        console.log(response.data);
        // Handle success or navigate to a different page (e.g., logout)
      })
      .catch(error => {
        console.error('Error deleting account:', error);
        // Handle error or show a notification to the user
      });
  };

  return (
    <div>
      <h1>Account Settings</h1>
      <div>
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <div>
        <h2>Change Username</h2>
        <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button onClick={handleChangeUsername}>Change Username</button>
      </div>
      <div>
        <h2>Change Email</h2>
        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={handleChangeEmail}>Change Email</button>
      </div>
      <div>
        <h2>Change Full Name</h2>
        <input
          type="text"
          placeholder="New Full Name"
          value={newFullName}
          onChange={(e) => setNewFullName(e.target.value)}
        />
        <button onClick={handleChangeFullName}>Change Full Name</button>
      </div>
      <div>
        <h2>Delete Account</h2>
        <p>Are you sure you want to delete your account?</p>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
};

export default Settings;

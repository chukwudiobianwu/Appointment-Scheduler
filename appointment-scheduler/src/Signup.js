// src/SignUp.js

import React, { useState } from 'react';


function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added state for confirm password
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState(''); // Add gender state
  const [status, setStatus] = useState(''); // Add status state
  /*

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        fullName,
        email,
        newUsername: username, // Assuming you've updated this in the state
        newPassword: password, // Assuming you've updated this in the state
        birthday,
        gender,
        Status,
      });
  
      console.log('Sign up successful:', response.data);
  
      // You can handle success actions here (e.g., redirect to another page)
    } catch (error) {
      console.error('Sign up failed:', error.response.data);
      // Handle error, show a message, etc.
    }
  };
  */
  const handleCheckState = () => {
    console.log('Current fullName state:', gender);
  };

  return (
    <div className="sapp-container">
      <div className="signup-container">
        <h1 id="sig">Sign Up</h1>
        <form>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            placeholder="Enter your Fullname"
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="newUsername">Username:</label>
          <input
            type="text"
            id="newUsername"
            placeholder="Enter your username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />

          <label htmlFor="newPassword">Password:</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />


          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          <label htmlFor="Gender">Gender:</label>
                  <p>
                    Male
                    <input
                      type="radio"
                      name="Gender"
                      value="Male"
                      onChange={() => setGender('Male')}
                    />
                    | Female
                    <input
                      type="radio"
                      name="Gender"
                      value="Female"
                      onChange={() => setGender('Female')}
                    />
                  </p>

                  <label htmlFor="Status">Status:</label>
                  <select
                    id="Status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Customer">Customer</option>
                    <option value="Employee">Employee</option>
                  </select>


          <button type="button" >
            Sign Up
          </button>
      <button type="button" onClick={handleCheckState}>
        Check State
      </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

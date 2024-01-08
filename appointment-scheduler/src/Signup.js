// src/SignUp.js
import axios from 'axios'
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
// src/Signup.js




function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [Username, setNewUsername] = useState('');
  const [Password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added state for confirm password
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState(''); // Add gender state
  const [status, setStatus] = useState(''); // Add status state
  const nav = useNavigate()

  const handleSignUp = (e) => {
    if(Password != confirmPassword){
      alert("Passwords do not match")
      return
    }
    e.preventDefault()
    axios.post('http://localhost:3001/Signup', {fullName,email,Username,Password,confirmPassword,birthday,gender,status})
    .then(result => {console.log(result) 
      nav('/')
      alert("Sign Up Successful")
    })
    .catch(err => console.log(err))
  };
  /*
  const user = {
    fullName: fullName,
    email: email,
    newUsername: newUsername,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
    birthday: birthday,
    gender: gender,
    status: status,
  };

  const handleSignUp = () => {
  UserInfo.create(user, (error, user) => {
    if (error) {
      console.error(error);
    } else {
      console.log('User profile created:', user);
    }
    mongoose.connection.close(); // Close the connection after inserting data
  });
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
            value={Username}
            onChange={(e) => setNewUsername(e.target.value)}
          />

          <label htmlFor="newPassword">Password:</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter Password"
            value={Password}
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


          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>

      <button type="button" onClick={handleSignUp}>
        Check State
      </button>
      
        </form>
      </div>
    </div>
  );
}


export default SignUp;

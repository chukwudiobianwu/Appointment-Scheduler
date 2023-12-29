// src/App.js

import React, { useState } from 'react';
import './App.css';
import SignUp from './Signup.js';
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';

function Login() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
/*
  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  const handleSignup = () => {
    // Assuming authentication is successful, navigate to the sign-up page
    navigate.push('/SignUp');
  };
  */

  return (
    <div className="sign-in-container">
      <h1>Appointment Scheduler</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button">
          Sign In
        </button>
        <p>
          <a
            className="come"
            href="SignUp.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Forgot password?
          </a>
        </p>
        <nav>
          <Link to="/SignUp">Sign Up</Link>
        </nav>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
        
        <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      
    </div>
  );
}

export default App;

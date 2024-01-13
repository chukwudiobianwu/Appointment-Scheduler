// src/App.js
import axios from 'axios'
import React, { useState } from 'react';
import './App.css';
import SignUp from './Signup.js';
import Home from './Home.js';
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import Profile from "./Profile/Profile.js";
import Settings from "./Settings/Settings.js";

const Login = ({ setUserId }) => {
  
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState();
  const nav = useNavigate()
  const handleSubmit = (e) => {
    
    e.preventDefault();
    axios.post('http://localhost:3001/signin', { Username, Password })
      .then(result => {
        console.log(result);
        if (result.data.status === "success") {
          setUserId(result.data.userId)
          localStorage.setItem('userId', result.data.userId);
          localStorage.setItem('status', result.data.Status)
          // Pass the user ID to your navigation function or store it in a state
          nav('/home');
        } else if (result.data.status === "incorrectPassword") {
          alert("The password is incorrect");
        } else if (result.data.status === "userNotExist") {
          alert("User does not exist");
        }
      })
      .catch(err => console.log(err));
  };
/*
  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  const handleSignup = () => {
    // Assuming authentication is successful, navigate to the sign-up page
    navigate.push('/SignUp');
  };
  */

  return (
    <div className="sapp-container">
    <div className="sign-in-container">
      <h1 id='sam'>Appointment Scheduler</h1>
      <form>
        <label htmlFor="Username">Username:</label>
        <input
          type="text"
          id="Username"
          value={Username}
          placeholder='Enter Username'
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="Password">Password:</label>
        <input
          type="Password"
          id="Password"
          placeholder='Enter Password'
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleSubmit}>
          Sign In
        </button>
        <p>
          <a
            className="come"
            href="SignUp.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Forgot Password?
          </a>
        </p>
        <nav>
          <Link to="/SignUp">Sign Up</Link>
        </nav>
      </form>
    </div>
    </div>
  );
}

function App() {
  const [userId, setUserId] = useState(null);
  const Status = localStorage.getItem('status')
  console.log('frbrb',Status)
  return (
    <div className="app-container">
        
        <Routes>
        <Route path="/" element={<Login setUserId={setUserId}/>}></Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/home" element={<Home userId={userId} />} />
        <Route path="/profile" element={<Profile userIdd={userId} Status={Status}/>} />
        <Route path="/Settings" element={<Settings/>} />
        </Routes>
      
    </div>
  );
}

export default App;

// src/App.js
import axios from 'axios'
import React, { useState } from 'react';
import './App.css';
import SignUp from './Signup.js';
import Home from './Home.js';
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';

function Login() {
  
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState();
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/signin', {Username ,Password})
    .then(result => {console.log(result)
      if (result.data == "success"){
        nav('/home')
      }if(result.data == "the Password is incorrect"){
        alert("the Password is incorrect")
      }
    })
    .catch(err => console.log(err))
  }
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
  );
}

function App() {
  return (
    <div className="app-container">
        
        <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        </Routes>
      
    </div>
  );
}

export default App;

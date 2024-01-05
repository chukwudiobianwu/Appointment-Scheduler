// HomePage.js
import React, { useState } from 'react';
import './Home.css';

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="home-page">
      <header>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <h1>Appointment Scheduler</h1>
      </header>

      <div className={`side-menu ${showMenu ? 'open' : ''}`}>
        <ul>
          <li>Profile</li>
          <li>Appointments</li>
          <li>Settings</li>
        </ul>
      </div>

      <main>
        {/* Your main content goes here */}
        <p>Welcome to the appointment scheduler application!</p>
      </main>
    </div>
  );
};

export default HomePage;

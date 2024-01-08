import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import Sidebar from './components/sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { BrowserRouter, Router, Routes, Route, Link, useNavigate} from 'react-router-dom';

const MyCalendar = ({ events }) => {
  const localizer = momentLocalizer(moment);

  return (
    <div>
      <h2>My Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

const AppointmentCalendar = () => {
  const localizer = momentLocalizer(moment);
  

  return (
    <div>
      <h2>Book an Appointment</h2>
      <Calendar
        localizer={localizer}
        
        startAccessor="start"
        endAccessor="end"
        selectable
        
        style={{ height: 300 , width:500 }}
      />
    </div>
  );
};

const HomePage = ({ userId }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Fetch user events based on userId
    axios.get(`http://localhost:3001/userEvents/${userId}`)
      .then(response => {
        setUserEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching user events:', error);
      });

    // Fetch available appointments
    axios.get('http://localhost:3001/appointments', { params: { userId } })
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, [userId]);

  const handleAppointmentSelect = ({ start, end }) => {
    // Handle the selected appointment, e.g., show a modal for booking
    setSelectedAppointment({ start, end });
  };

  return (
    <div className="home-page">
      <div className='firstPage'>
    <Sidebar />
        <p
          style={{
            textAlign: 'center',
            margin: '0 auto',
            color: 'black',
            fontSize: '40px',
          }}
        >
          Welcome ....
        </p>

        <div
          style={{
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '35px',
          }}
        >
          <p> Book An Appointment</p>
        </div>

        <div>
          <AppointmentCalendar
          />
        </div>

        <div
          style={{
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '35px',
          }}
        >
          Upcoming Events
        </div>

        <div>
          <MyCalendar events={userEvents} />
        </div>

      </div>
    </div>
    
  );
};

const Home = ({ userId }) => {
  return (
  <HomePage userId={userId} />
  
  )
};

export default Home;

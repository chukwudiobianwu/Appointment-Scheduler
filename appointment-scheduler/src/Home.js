import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import Sidebar from './components/sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { BrowserRouter, Router, Routes, Route, Link, useNavigate} from 'react-router-dom';

const Status = localStorage.getItem('status')
const userId = localStorage.getItem('userId')


const HomePage = ({ userIdd  ,userStatus}) => {

  if(Status == 'Employee')  {
    
    const AppointmentCalendar = () => {
      const localizer = momentLocalizer(moment);
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());

    
      const handleSelect = ({ start, end }) => {
        setStartDate(start);
        setEndDate(end);
      };
    
      const handleSetAvailability = () => {
        // Make a request to the server to set availability for the selected slot
        axios.post(`http://localhost:3001/set-availability/${userId}`, {
          start: startDate,
          end: endDate,
        })
        .then(response => {
          console.log(response.data);
          // Handle success or show a notification to the user
        })
        .catch(error => {
          console.error('Error setting availability:', error);
          // Handle error or show a notification to the user
        });
      };


      return (
        <div>
          <h2>Book an Appointment</h2>
          <div>
            <p>Select Date and Time:</p>
            <Calendar
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelect}
              style={{ height: 300, width: 500 }}
            />
          </div>
          <div>
            <p>Selected Date and Time:</p>
            <p>Start: {startDate.toString()}</p>
            <p>End: {endDate.toString()}</p>
            <p><input type='submit' value='Set Appointment Availability' onClick={handleSetAvailability}/></p>
          </div>
        </div>
      );
    };


    const GetBookeedAppointments = () => {
      const [BookedAppointments, setBookedAppointments] = useState([]);
      axios.get(`http://localhost:3001/booked-appointments/${userId}`)
      .then(response => {
        setBookedAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching available appointments:', error);
      });
      const localizer = momentLocalizer(moment);
      const convertEvent = (event) => ({
        start: new Date(event.start),
        end: new Date(event.end),
        title: event.title,
        // Remove the _id property or convert it to a string if needed
      });
      const convertedEvents = BookedAppointments.map(convertEvent);
      return (
        <div>
          <h2>My Calendar</h2>
          <Calendar
            localizer={localizer}
            events={convertedEvents}  
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            view = "week"
          />
        </div>
      );
  };


const AvailableAppointments = () => {
  const [availableAppointments, setAvailableAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/Set-Available-appointments/${userId}`)
      .then(response => {
        setAvailableAppointments(response.data.av);
        console.log("wfwfr",response.data.av)
      })
      .catch(error => {
        console.error('Error fetching available appointments:', error);
      });
  }, [userId]);
  console.log("wfwfr",availableAppointments)
  const localizer = momentLocalizer(moment);
  const convertEvent = (event) => ({
    start: new Date(event.start),
    end: new Date(event.end),
    title: event.title,
    // Remove the _id property or convert it to a string if needed
  });
  const convertedEvents = availableAppointments.map(convertEvent);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSelect = ({ start, end }) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleDeleteAppointment = () => {
    if (startDate !== null && endDate !== null) {
      // Make a request to the server to delete the selected appointment
      axios.post(`http://localhost:3001/remove-set-appointment/${userId}`, {
        start: startDate,
        end: endDate,
        
      })
        .then(response => {
          console.log(response.data);
          // Update the availableAppointments state after successful deletion
          // Reset the selectedAppointment state
        })
        .catch(error => {
          console.error('Error deleting appointment:', error);
        });
    }
  };
  return (
    <div>
      <h2>My Calendar</h2>
      <Calendar
        localizer={localizer}
        events={convertedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent= {handleSelect}
        
      />

      <div>
            <p>Selected Date and Time:</p>
            <p>Start: {startDate.toString()}</p>
            <p>End: {endDate.toString()}</p>
            <p><input type='submit' value='Delete Selected Appointment Availability' onClick={handleDeleteAppointment}/></p>
        </div>
    </div>
    
  );
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
          <p>Set Appointment</p>
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
          Assigned Appointments
        </div>
        <div>
          <AvailableAppointments/>
        </div>

        <div
          style={{
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '35px',
          }}
        >
          Upcoming Appointments
        </div>

        <div>
          <GetBookeedAppointments/>
        </div>

      </div>
    </div>
    
  );
}




else {

  
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
            view = "week"
          />
        </div>
      );
    };
    
    const AvailableAppointments  = () => {
      const localizer = momentLocalizer(moment);
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
      const [title, setTitle] = useState('');
      const handleSelect = ({ start, end }) => {
        setStartDate(start); 
        setEndDate(end);
      };
    
      const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };
      
        const [availableAppointments, setAvailableAppointments] = useState([]);
      
        useEffect(() => {
          axios.get(`http://localhost:3001/available-appointments`)
            .then(response => {
              setAvailableAppointments(response.data);
              console.log("wfwfr",response.data)
            })
            .catch(error => {
              console.error('Error fetching available appointments:', error);
            });
        }, [userId]);
      const convertEvent = (event) => ({
        start: new Date(event.start),
        end: new Date(event.end),
        title: event.title,
        // Remove the _id property or convert it to a string if needed
      });
      const convertedEvents = availableAppointments.map(convertEvent);
      return (
        <div>
          <h2>Book an Appointment</h2>
          <div>
            <p>Select Date and Time:</p>
            <Calendar
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              events = {convertedEvents}
              onSelectEvent={handleSelect}
              style={{ height: 400, width: 800 }}
            />
          </div>
          <div>
            <p>Title:</p>
            <input type="text" value={title} onChange={handleTitleChange} />
            <input type='submit' name='Set Appointment Availability' />
          </div>
          <div>
            <p>Selected Date and Time:</p>
            <p>Start: {startDate.toString()}</p>
            <p>End: {endDate.toString()}</p>
            <p>Title: {title}</p>
          </div>
        </div>
      );
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
          <p>Book An Appointment</p>
        </div>

        <div>
          <AvailableAppointments
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
          Upcoming Appointments
        </div>

        <div>
          <MyCalendar />
        </div>

      </div>
    </div>
    
  );
}
}


const Home = ({ userId, Status }) => {
  return <HomePage userId={userId} userStatus={Status} />;
};

export default Home;

/*
const MyCalendar = ({ events, selectable, onSelectSlot }) => {
  const localizer = momentLocalizer(moment);

  return (
    <div>
      <h2>My Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        selectable={selectable}
        onSelectSlot={onSelectSlot}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

const AppointmentCalendar = ({ userId, upcomingAppointments }) => {
  const localizer = momentLocalizer(moment);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    // Handle the selected slot, e.g., show a modal for setting availability
    setSelectedSlot({ start, end });
  };

  const handleSetAvailability = () => {
    // Make a request to the server to set availability for the selected slot
    axios.post(`http://localhost:3001/set-availability/${userId}`, {
      start: selectedSlot.start,
      end: selectedSlot.end,
    })
    .then(response => {
      console.log(response.data);
      // Handle success or show a notification to the user
    })
    .catch(error => {
      console.error('Error setting availability:', error);
      // Handle error or show a notification to the user
    });
  };

  return (
    <div>
      <h2>Set Availability</h2>
      <MyCalendar
        events={upcomingAppointments}
        selectable
        onSelectSlot={handleSelectSlot}
      />
      {selectedSlot && (
        <div>
          <p>Selected Slot: {selectedSlot.start.toLocaleString()} - {selectedSlot.end.toLocaleString()}</p>
          <button onClick={handleSetAvailability}>Set Availability</button>
        </div>
      )}
    </div>
  );
};

const BookAppointment = ({ userId, availableAppointments }) => {
  const localizer = momentLocalizer(moment);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    // Handle the selected appointment slot, e.g., show a modal for booking
    setSelectedAppointment({ start, end });
  };

  const handleBookAppointment = () => {
    // Make a request to the server to book the selected appointment
    axios.post(`http://localhost:3001/book-appointment/${userId}`, {
      start: selectedAppointment.start,
      end: selectedAppointment.end,
    })
    .then(response => {
      console.log(response.data);
      // Handle success or show a notification to the user
    })
    .catch(error => {
      console.error('Error booking appointment:', error);
      // Handle error or show a notification to the user
    });
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <MyCalendar
        events={availableAppointments}
        selectable
        onSelectSlot={handleSelectSlot}
      />
      {selectedAppointment && (
        <div>
          <p>Selected Appointment: {selectedAppointment.start.toLocaleString()} - {selectedAppointment.end.toLocaleString()}</p>
          <button onClick={handleBookAppointment}>Book Appointment</button>
        </div>
      )}
    </div>
  );
};

const HomePage = ({ userId, userStatus }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [availableAppointments, setAvailableAppointments] = useState([]);

  useEffect(() => {
    // Fetch upcoming appointments for the user
    axios.get(`http://localhost:3001/upcoming-appointments/${userId}`)
      .then(response => {
        setUpcomingAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching upcoming appointments:', error);
      });

    // Fetch available appointments for booking
    axios.get('http://localhost:3001/available-appointments')
      .then(response => {
        setAvailableAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching available appointments:', error);
      });
  }, [userId]);

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

        {userStatus === 'employee' && (
          <AppointmentCalendar userId={userId} upcomingAppointments={upcomingAppointments} />
        )}

        {userStatus === 'customer' && (
          <BookAppointment userId={userId} availableAppointments={availableAppointments} />
        )}

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
          <MyCalendar events={upcomingAppointments} />
        </div>

      </div>
    </div>
  );
};

const Home = ({ userId, userStatus }) => {
  return <HomePage userId={userId} userStatus={userStatus} />;
};

export default Home;
*/
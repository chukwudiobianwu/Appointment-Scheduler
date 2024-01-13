
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb+srv://AS:Mongo123@wudy.42dc5no.mongodb.net/info?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event listener for successful connection
db.on('connected', () => {
  console.log('Connected to the database');
});

// Event listener for connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Create a mongoose schema (model) for userinfo collection
const UserInfo = mongoose.model('UserInfo', {
  fullName: String,
  email: String, 
  Username: String,
  Password: String,
  birthday: String,
  gender: String,
  status: String,
  SetAppointments: [
    {
      start: Date,
      end: Date,
      title: String,
    },
  ],
  UpcomingAppointments: [
    {
      start: Date,
      end: Date,
      title: String,
    },
  ],
  AvailableAppointments: [
    {
      start: Date,
      end: Date,
      title: String,
    },
  ],
  BookedAppointments: [
    {
      start: Date,
      end: Date,
      title: String,
      bookedBy: String, // User ID of the customer who booked the appointment
    },
  ],

});

app.post('/SignUp', async (req, res) => {
  UserInfo.create(req.body)
  .then(alinfo => res.json(alinfo))
  .catch(err => res.json(err))
})

app.post('/signin', async (req, res) => {
  const { Username, Password } = req.body;
  UserInfo.findOne({ Username: Username })
    .then(user => {
      if (user) {
        if (user.Password === Password) {
          res.json({ status: "success", userId: user._id, Status: user.status }); // Include user ID in the response
        } else {
          res.json({ status: "incorrectPassword" });
        }
      } else {
        res.json({ status: "userNotExist" });
      }
    })
    .catch(err => res.json({ status: "error", error: err.message }));
});

app.get('/getUserInfo/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log("evevev",userId)
  UserInfo.findById(userId)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.json({ status: "userNotExist" });
      }
    })
    .catch(err => res.json({ status: "error", error: err.message }));
});

app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log("evevev",userId)
  UserInfo.findById(userId)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.json({ status: "userNotExist" });
      }
    })
    .catch(err => res.json({ status: "error", error: err.message }));
});


/*
app.use(bodyParser.json());

app.get('/' , (req, res)   => {
res.send('Hello Node Api')
})

app.post('/api/signup', async (req, res) => {

  try {
    const userData = req.body;
    console.log('Received sign-up request:', req.body);
    // Use the UserInfo model for the userinfo collection
    const user = new UserInfo(userData);
    
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/
app.put('/change-password/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  try {
    // Find user by ID and update the password
    const updatedUser = await UserInfo.findByIdAndUpdate(userId, { Password: newPassword });
    res.json({ status: 'success', message: 'Password changed successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
});

// Change Username
app.put('/change-username/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newUsername } = req.body;

  try {
    // Find user by ID and update the username
    const updatedUser = await UserInfo.findByIdAndUpdate(userId, { Username: newUsername });
    res.json({ status: 'success', message: 'Username changed successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
});

// Change Email
app.put('/change-email/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newEmail } = req.body;

  try {
    // Find user by ID and update the email
    const updatedUser = await UserInfo.findByIdAndUpdate(userId, { email: newEmail });
    res.json({ status: 'success', message: 'Email changed successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
});

// Change Full Name
app.put('/change-fullname/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newFullName } = req.body;

  try {
    // Find user by ID and update the full name
    const updatedUser = await UserInfo.findByIdAndUpdate(userId, { fullName: newFullName });
    res.json({ status: 'success', message: 'Full name changed successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
});

// Delete Account
app.delete('/delete-account/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user by ID and delete the account
    await UserInfo.findByIdAndDelete(userId);
    res.json({ status: 'success', message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error', error });
  }
});

// Get available appointments for booking
app.get('/available-appointments', async (req, res) => {
  try {
    // Fetch available appointments from all employees
    const employees = await UserInfo.find({ status: 'Employee' });

    let availableAppointments = [];

    // Extract AvailableAppointments from each employee
    employees.forEach(employee => {
      availableAppointments = [...availableAppointments, ...employee.AvailableAppointments];
    });

    res.status(200).json(availableAppointments);
  } catch (error) {
    console.error('Error fetching available appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Book an appointment for a customer
app.post('/book-appointment/:userId', async (req, res) => {
  try {
    const { start, end } = req.body;
    const userId = req.params.userId;

    // Step 1: Find the user
    const user = await UserInfo.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Find an employee with the specified availability
    const employee = await UserInfo.findOne({
      status: "Employee",
      "AvailableAppointments.start": start,
      "AvailableAppointments.end": end
    });

    if (employee) {
      // Step 3: Remove the appointment slot from the employee's AvailableAppointments
      employee.AvailableAppointments = employee.AvailableAppointments.filter(
        appointment => appointment.start !== start || appointment.end !== end
      );

      // Step 4: Add the appointment to both the user's and the employee's UpcomingAppointments
      user.UpcomingAppointments.push({ start, end, title: 'Booked' });
      employee.UpcomingAppointments.push({ start, end, title: 'Booked' });

      // Step 5: Save the changes to both user and employee documents
      await user.save();
      await employee.save();

      return res.status(200).json({ message: 'Appointment booked successfully' });
    } else {
      return res.status(404).json({ message: 'No available employee for the selected appointment slot' });
    }
  } catch (error) {
    console.error('Error booking appointment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get upcoming appointments for a user
app.get('/upcoming-appointments/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Assume userId is valid
    const user = await UserInfo.findById(userId);

    if (user) {
      // Return the UpcomingAppointments array
      res.status(200).json(user.UpcomingAppointments);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching upcoming appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/set-availability/:userId', async (req, res) => {
  try {
    const { start, end} = req.body;
    const userId = req.params.userId;
    console.log(start)


    // Assume userId is valid and the user has the status of 'employee'
    const user = await UserInfo.findById(userId);

    if (user) {
      // Add the availability to the user's AvailableAppointments array
      user.AvailableAppointments.push({ start, end, title: 'Available' });
      await user.save();

      res.status(200).json({ message: 'Availability set successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error setting availability:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/booked-appointments/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Assume userId is valid
    const user = await UserInfo.findById(userId);

    if (user) {
      // Return the UpcomingAppointments array
      res.status(200).json(user.BookedAppointments);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching upcoming appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/Set-Available-appointments/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserInfo.findById(userId);

    if (user) {
      res.status(200).json({av : user.AvailableAppointments});
      console.log("Available Appointments:", user.AvailableAppointments
      );
    } else {
      res.status(404).json({ message: 'User not found' });
      console.log('User not found for userId:', userId);
    }
  } catch (error) {
    console.error('Error fetching available appointments:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post('/remove-set-appointment/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { start, end } = req.body;

    const user = await UserInfo.findById(userId);

    if (user) {
      // Find the index of the appointment to be removed based on start and end dates
      const indexToRemove = user.AvailableAppointments.findIndex(
        (appointment) =>
          appointment.start.getTime() === new Date(start).getTime() &&
          appointment.end.getTime() === new Date(end).getTime()
      );

      if (indexToRemove !== -1) {
        // Remove the appointment from the AvailableAppointments array
        user.AvailableAppointments.splice(indexToRemove, 1);
        await user.save();

        res.status(200).json({
          message: 'Appointment removed successfully',
          updatedAvailableAppointments: user.AvailableAppointments,
        });

        console.log('Appointment removed successfully');
      } else {
        res.status(404).json({ message: 'Appointment not found' });
        console.log('Appointment not found for start and end dates:', start, end);
      }
    } else {
      res.status(404).json({ message: 'User not found' });
      console.log('User not found for userId:', userId);
    }
  } catch (error) {
    console.error('Error removing appointment:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});



app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

/*
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors());  // Enable CORS
app.use(bodyParser.json());

app.post('/find-one', async (req, res) => {
  try {
    const data = {
      "collection": "listingsAndReviews",
      "database": "sample_airbnb",
      "dataSource": "WUDY",
      "projection": {
        "_id": 1
      }
    };

    const config = {
      method: 'post',
      url: 'https://us-east-2.aws.data.mongodb-api.com/app/data-wyaef/endpoint/data/v1/action/findOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'ZvYUXQKf9tYrKx6pG4GxKF6oDykQF8IQDsSHJGSVQrWiRbQ8ESvUkHNpGW5ZR5uY',
      },
      data: JSON.stringify(data)
    };

    const response = await axios(config);

    if (response.status === 200) {
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    } else {
      console.error('Unexpected status code:', response.status);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
*/

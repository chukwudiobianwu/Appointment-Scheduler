// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
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

// Create a mongoose schema (model)
const User = mongoose.model('User', {
  fullName: String,
  email: String,
  newUsername: String,
  newPassword: String,
  birthday: String,
  gender: String,
  status: String,
});

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

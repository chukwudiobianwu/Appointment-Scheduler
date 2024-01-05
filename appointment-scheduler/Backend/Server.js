
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
});

app.post('/SignUp', async (req, res) => {
  UserInfo.create(req.body)
  .then(alinfo => res.json(alinfo))
  .catch(err => res.json(err))
})

app.post('/signin', async (req, res) => {
  const {Username, Password} = req.body
  UserInfo.findOne({Username: Username})
  .then(user => {
    if(user){
      if (user.Password === Password){
        res.json("success")
        alert("yeah")
      }else{
        res.json("the password is incorrect")
      }
    }else{
      res.json("User Does not Exist")
    }
  })
})
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

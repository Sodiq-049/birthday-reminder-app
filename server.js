const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const {birthdayCron} = require('./cron/birthdayCron'); // Import the birthday cron job
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Set the port for the server

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use('/api', userRouter); // Use the user router for API routes

// Serve static files from the 'frontend' directory
app.use(express.static('frontend')); // Adjust the path if your frontend folder is named differently

mongoose.connect(process.env.MONGODB_URI) // Connect to MongoDB
    .then(() => {
        console.log('Connected to MongoDB'); // Log a success message
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`); // Start the server and log the port
        }); // Start the server
    })
    .catch(err => console.error(err)); // Log any connection errors

// Start the cron job
birthdayCron(); // Start the birthday cron job
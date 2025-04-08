const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Import the User model
router.post('/users', async (req, res) => {
    const { username, email, dob } = req.body;

    // Validate that all required fields are provided
    if (!username || !email || !dob) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create and save the new user if no existing user is found
        const newUser = new User({ username, email, dob });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user: ' + error.message });
    }
});



module.exports = router; // Export the router for use in other files
// This code defines an Express router for handling user registration. It imports the User model and defines a POST route for registering a new user. The route validates the input data, creates a new user instance, saves it to the database, and responds with either a success or error message.
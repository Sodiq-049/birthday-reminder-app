const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    dob: {type: Date, required: true},
});

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model with three fields: username, email, and date of birth (dob). The username and email are required fields.
// cron/birthdayCron.js
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = require('../models/User');

const sendBirthdayEmail = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    const users = await User.find({
        dob: { $regex: todayString.split('-')[1] + '-' + todayString.split('-')[2] }
    });

    users.forEach(user => {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Happy Birthday!',
            text: `Happy Birthday, ${user.username}! Wishing you a wonderful day filled with joy and happiness!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });
    });
};

const birthdayCron = () => {
    cron.schedule('0 7 * * *', () => {
        console.log('Running birthday cron job...');
        sendBirthdayEmail();
    });
};

module.exports = { birthdayCron, sendBirthdayEmail };

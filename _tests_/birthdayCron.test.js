// _tests_/birthdayCron.test.js
const { sendBirthdayEmail } = require('../cron/birthdayCron'); // Import the sendBirthdayEmail function
const User = require('../models/User'); // Import the User model
const nodemailer = require('nodemailer');

// Mock the nodemailer transporter
jest.mock('nodemailer');

describe('Birthday Cron Job', () => {
    beforeAll(() => {
        // Mock the User.find method
        jest.spyOn(User, 'find').mockImplementation(async () => {
            return [
                { username: 'John Doe', email: 'john@example.com' },
                { username: 'Jane Doe', email: 'jane@example.com' }
            ];
        });
    });

    afterAll(() => {
        jest.restoreAllMocks(); // Restore original implementations
    });

    it('should send birthday emails to users with birthdays today', async () => {
        // Create a mock for the sendMail function
        const sendMailMock = jest.fn((mailOptions, callback) => {
            callback(null, { response: 'Email sent' });
        });

        // Mock the createTransport function to return an object with sendMail
        nodemailer.createTransport.mockReturnValue({
            sendMail: sendMailMock
        });

        // Directly call the sendBirthdayEmail function
        await sendBirthdayEmail();

        // Check if the sendMail function was called for each user
        expect(sendMailMock).toHaveBeenCalledTimes(2);
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                to: 'john@example.com',
                subject: 'Happy Birthday!',
                text: expect.stringContaining('Happy Birthday, John Doe!')
            }),
            expect.any(Function)
        );
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                to: 'jane@example.com',
                subject: 'Happy Birthday!',
                text: expect.stringContaining('Happy Birthday, Jane Doe!')
            }),
            expect.any(Function)
        );
    });
});
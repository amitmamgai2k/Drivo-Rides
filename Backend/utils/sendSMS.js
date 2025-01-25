require('dotenv').config(); // Load environment variables
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const sendRegistrationMessage = async (userMobileNumber,firstname,lastname) => {
  try {
    const message = await client.messages.create({
      body: `Hey! ${firstname} ${lastname} You are Successfully Registered on Drivo Rides! Lets ride!`,
      to: userMobileNumber,
      from: process.env.TWILIO_MOBILE_NUMBER, // Twilio phone number
    });

    console.log('Message SID:', message.sid); // Log message SID for reference
  } catch (error) {
    console.error('Error sending SMS:', error.message); // Handle errors
  }
};

module.exports = { sendRegistrationMessage };
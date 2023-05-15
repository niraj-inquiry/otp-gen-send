const twilio = require('twilio');

// Set your Twilio credentials
const accountSid = 'AC89c2e0076fb4459fecdb7024032a4f3b';
const authToken = '8e253caabbeb1d289703368b40408c2a';
const twilioPhoneNumber = '+919507715399';

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Function to send OTP via SMS
function sendOTP(phoneNumber, otp) {
  const message = `Your OTP is: ${otp}`;

  client.messages.create({
    body: message,
    from: twilioPhoneNumber,
    to: phoneNumber
  })
  .then((message) => console.log('OTP sent successfully:', message.sid))
  .catch((error) => console.error('Failed to send OTP:', error));
}

module.exports = sendOTP;
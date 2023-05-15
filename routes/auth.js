const express = require('express');
const router = express.Router();
const User = require('../models/User');
const OTP=require('../models/OTP')
const generateOTP=require('../generateOTP')
// Registration
router.post('/register', (req, res) => {
  const { name, phoneNumber } = req.body;
  
  const newUser = new User({
    name,
    phoneNumber
  });
  
  newUser.save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
});

// Login
router.post('/login', (req, res) => {
    const { phoneNumber } = req.body;
  
    User.findOne({ phoneNumber })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
  
        // Generate OTP
        const otp = generateOTP(); // Implement your OTP generation logic here
  
        // Save OTP to the database
        const newOTP = new OTP({
          phoneNumber,
          otp
        });
  
        newOTP.save()
          .then(() => {
            sendOTP(phoneNumber, otp);
  
            // For the sake of simplicity, we'll respond with the OTP in the API response
            res.json({ success: true, otp });
          })
          .catch((error) => {
            res.status(500).json({ success: false, message: 'Failed to generate OTP' });
          });
      })
      .catch((error) => {
        res.status(500).json({ success: false, message: 'Failed to find user' });
      });
  });
  
  module.exports=router;
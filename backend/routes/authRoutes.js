const express = require('express');
const router = express.Router();
const { sendOtp } = require('../controllers/authController');

// Routes
router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyOtp);
// router.post('/register', registerUser);

module.exports = router;

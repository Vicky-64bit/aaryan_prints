const Otp = require("../models/Otp");
const User = require("../models/User");
const axios = require("axios");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// MSG91 credentials from .env
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID;
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;
const MSG91_ROUTE = 4; // transactional

// Generate 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via MSG91
const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile)
    return res.status(400).json({ message: "Mobile number is required" });

  try {
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 mins

    await Otp.deleteMany({ mobile });
    // Save OTP to DB
    await Otp.create({ mobile, otp, expiresAt });

    // Send via MSG91
    const response = await axios.get(
      `https://api.msg91.com/api/v5/otp?template_id=${MSG91_TEMPLATE_ID}&mobile=91${mobile}&authkey=${MSG91_AUTH_KEY}&otp=${otp}&route=4`
    );
    console.log("MSG91 Response:", response.data);
    console.log("Generated Otp: ", otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP


// Register user (after OTP verified)


module.exports = {
  sendOtp
  
};

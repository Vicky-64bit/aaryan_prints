const Otp = require("../models/Otp");
const axios = require("axios");

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile)
    return res.status(400).json({ message: "Mobile number is required" });

  try {
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ mobile });

    await Otp.create({ mobile, otp, expiresAt });

    await axios.get(
      `https://api.msg91.com/api/v5/otp?template_id=${MSG91_TEMPLATE_ID}&mobile=91${mobile}&authkey=${MSG91_AUTH_KEY}&otp=${otp}`
    );

    console.log("OTP GENERATED (DEV):", otp);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

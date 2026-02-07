const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {protect} = require("../middlewares/authMiddelware");
const Otp = require("../models/Otp");
const router = express.Router();

// // @route POST /api/users/register
// // @desc Register a new User
// //@access Public
router.post("/register", async (req, res) => {
  const { firstName, lastName, gender, mobile, email, password, role } =
    req.body;

  try {
    // Registration logic
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({
      firstName,
      lastName,
      gender,
      mobile,
      email,
      password,
      role,
    });
    await user.save();

    // res.status(201).json({
    //     user:{
    //         _id: user._id,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         email: user.email,
    //         role: user.role,
    //         mobile: user.mobile,
    //         gender: user.gender,
    //         password: user.password,

    //     },
    // });

    //Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "20h" },
      (err, token) => {
        if (err) throw err;

        //Send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            mobile: user.mobile,
            gender: user.gender,
            password: user.password,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});






// @route POST /api/users/register
// @desc Register a new User (OTP protected)
// @access Public
// router.post("/register", async (req, res) => {
//   const { firstName, lastName, gender, mobile, email, password, role, otp } =
//     req.body;

//   try {
//     if (!otp) {
//       return res.status(400).json({ message: "OTP is required" });
//     }

//     const otpRecord = await Otp.findOne({ mobile });

//     if (!otpRecord || otpRecord.otp !== String(otp)) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     if (new Date() > otpRecord.expiresAt) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     const existingUser = await User.findOne({
//       $or: [{ email }, { mobile }],
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = new User({
//       firstName,
//       lastName,
//       gender,
//       mobile,
//       email,
//       password, // hashed by model
//       role,
//     });

//     await user.save();
//     await Otp.deleteOne({ _id: otpRecord._id });

//     const payload = { user: { id: user._id, role: user.role } };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "20h" },
//       (err, token) => {
//         if (err) throw err;

//         res.status(201).json({
//           user: {
//             _id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             role: user.role,
//             mobile: user.mobile,
//             gender: user.gender,
//           },
//           token,
//         });
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });


// @route POST /api/users/login
// @desc Authenticate User
// @access Public
router.post("/login", async(req, res)=>{
    const {email, password } =
    req.body;

    try{
        //Find the user by email
        let user = await User.findOne({email});
         if (!user) return res.status(400).json({ message: "Invalid Credentials" });
         const isMatch = await user.matchPassword(password);
         if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

          //Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "20h" },
      (err, token) => {
        if (err) throw err;

        //Send the user and token in response
        res.json({
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            mobile: user.mobile,
            gender: user.gender,
            
          },
          token,
        });
      }
    );

    } catch(error){
        console.error(error);
        res.status(500).send("Server Error!");
    }
});

// @route   PUT /api/users/update-user
// @desc    Update logged-in user
// @access  Private
router.put("/update-user", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.gender = req.body.gender || user.gender;
    user.mobile = req.body.mobile || user.mobile;

    // Only update password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      gender: user.gender,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/users/profile
// @desc Get loggedn user's profile(Protected Route)
// @access Private

router.get("/profile", protect,  async (req, res) => {
    res.json(req.user);
});


module.exports = router;

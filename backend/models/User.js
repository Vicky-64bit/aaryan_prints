const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
        type: String,
        required: true, 
        trim: true,
    },
    lastName: {
        type: String, 
        trim: true,
    },
     gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid emal address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
   {timestamps: true }

);

//Password Hash Middelware
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match User entered password to Hashed password 

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
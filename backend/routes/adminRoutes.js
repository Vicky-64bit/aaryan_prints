const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middlewares/authMiddelware");

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all uses (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async(req, res)=>{
    try{
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// @route POST /api/admin/users
// @desc Add a new User (Admin only)
// @access Private/Admin
router.post("/", protect, admin, async(req, res)=>{
    const { firstName, secondName, lastName, mobile, email, password, role } =
    req.body;

    try {
        let user = await User.findOne({ mobile });
        if(user){
            return req.status(400).json({message: "User already registered"});
        }

        user = new User({
            firstName,
            lastName,
            mobile,
            email,
            password,
            role: role || "customer",
        });
        await user.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// @route PUT /api/admin/users/:id
// @desc Update User info (admin only) - Name, email, mobile and role
// @access Private/Admin
router.put("/:id", protect, admin, async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        if(user){
            user.firstName = req.body.firstName || user.firstName;
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.mobile = req.body.mobile || user.mobile;
            user.role = req.body.role || user.role;
        }
        const updatedUser = await user.save();
        res.json({message: "User upadted successsfully", user: updatedUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});        
    }
});

// @route DELETE /api/admin/users/:id
// @desc delete a user
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({message: "User deleted successfully"});
        } else{
            res.status(400).json({message: "User not found"});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"}); 
    }
})

module.exports = router;
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');
const sendMail = require('../utils/sendMail')
const bcrypt = require("bcrypt"); // Use bcrypt for hashing passwords

module.exports.registerUser = async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { fullname, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ error: "User already exists" });
    }
    const hashPassword = await userModel.hashPassword(password);

    try {
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword
        });

        const token = await user.generateAuthToken();
        res.status(201).json({ token, user });

    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Server error" });
    }
};
module.exports.loginUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email }).select('+password');//password also needed
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const isMatch = await user.comparePassword(password); // checking password
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = await user.generateAuthToken();
        res.status(200).json({ token, user });
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ error: "Server error" });
    }
};
module.exports.getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id); //req.user.id is set in auth middleware
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user }); //sending user details
    } catch (err) {
        console.error("Error getting user profile:", err);
        res.status(500).json({ error: "Server error" });
    }
        }
module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token||req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({ token });
    res.status(200).json({ message: "Logout successful" });
}

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate OTP
        const otp = rideService.getOtp(4); // Assuming a function that generates a 4-digit OTP
        user.otp = otp; // Save OTP in the database (assuming `otp` is a field in the user schema)
        user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        // Send OTP via email
        const subject = "Reset Password";
        const message = `Enter the OTP to reset your password: ${otp}`;
        await sendMail(email, subject, message);

        // Inform user that OTP has been sent
        return res.status(200).json({ message: `OTP sent to email ${email} successfully.` });
    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(500).json({ error: "Server error" });
    }
};


module.exports.verifyOtp = async (req, res) => {
    try {
        const { email, enteredOtp, newPassword } = req.body;

        // Validate input
        if (!email || !enteredOtp || !newPassword) {
            return res.status(400).json({ error: "Email, OTP, and new password are required" });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check OTP validity
        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ error: "OTP has expired. Please request a new one." });
        }

        if (String(enteredOtp).trim() !== String(user.otp).trim()) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // Clear OTP after successful verification
        user.otp = undefined;
        user.otpExpires = undefined;

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        // Save the updated user
        await user.save();

        return res.status(200).json({ message: "Password updated successfully. You can now log in with your new password." });
    } catch (err) {
        console.error("Error verifying OTP:", err);
        res.status(500).json({ error: "Server error" });
    }
};

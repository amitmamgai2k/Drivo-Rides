const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');
const sendMail = require('../utils/sendMail')
const bcrypt = require("bcrypt"); // Use bcrypt for hashing passwords
const uploadOnCloudinary = require('../utils/cloudinary');
const {sendRegistrationMessage} = require('../utils/sendSMS');

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Parse fullname from stringified JSON

    const { fullname,email, password, mobileNumber } = req.body;


    // Correct ProfileImage path (use req.file)
    const ProfilePictureLocalPath = req.file?.path;
    if (!ProfilePictureLocalPath) {
      return res.status(400).json({ error: "Profile picture is required" });
    }

    // Fix required fields check (use || instead of ,)
    if (!fullname || !email || !password || !mobileNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user exists
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Upload to Cloudinary
    const ProfilePicture = await uploadOnCloudinary(ProfilePictureLocalPath);
    if (!ProfilePicture) {
      return res.status(400).json({ error: "Error uploading profile picture" });
    }

    // Hash password
    const hashPassword = await userModel.hashPassword(password);

    try {
      const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        mobileNumber,
        ProfilePicture: ProfilePicture.url,
      });
      const subject  = "Welcome to Drivo Rides";
      const message = `<div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">\n` +
      `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; line-height: 1.6;">\n` +
      `<p style="margin-bottom: 15px;">Welcome to Drivo Rides, ${fullname.firstname} ${fullname.lastname}!</p>\n` +
      `<p style="margin-bottom: 15px;">Thank you for registering with us. We're excited to have you on board.</p>\n` +
      `<p style="margin-bottom: 15px;">If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>\n` +
      `<p style="margin-bottom: 15px;">Best regards,<br>Drivo Rides Team</p>\n` +
      `</div>\n` +
      `</div>\n`;
      await sendMail(email, subject, message);

      const token = await user.generateAuthToken();
      await sendRegistrationMessage(`91${mobileNumber}`, fullname.firstname, fullname.lastname);
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
        const subject  = "Login Successful";
        const message = `<div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">\n` +
        `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; line-height: 1.6;">\n` +
        `<p style="margin-bottom: 15px;">Hello ${user.fullname.firstname},</p>\n` +
        `<p style="margin-bottom: 15px;">You have successfully logged in to your account.</p>\n` +
        `<p style="margin-bottom: 15px;">If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>\n` +
        `<p style="margin-bottom: 15px;">Best regards,<br>Drivo Rides Team</p>\n` +
        `</div>\n` +
        `</div>\n`;
        await sendMail(email, subject, message);

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
        const username = user.fullname.firstname + " " + user.fullname.lastname;
        // Send OTP via email
        const subject = "Reset Password";
        const message = `
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; line-height: 1.6;">
                <p style="margin-bottom: 15px;">Dear ${username},</p>

                <p style="margin-bottom: 15px;">You recently requested to reset your password. Please use the One-Time Password (OTP) below to proceed with resetting your password:</p>

                <div style="text-align: center; margin: 25px 0;">
                    <h3 style="color: #4CAF50; background-color: #e8f5e9;
                              padding: 12px 24px; border-radius: 5px;
                              display: inline-block; margin: 0;
                              border: 2px dashed #81c784;">
                        ${otp}
                    </h3>
                </div>

                <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;
                          margin: 20px 0; border-radius: 4px;">
                    <p style="margin: 0; color: #856404;">
                        ⚠️ This OTP is valid for the next <strong>10 minutes</strong>.
                        Please do not share this code with anyone.
                    </p>
                </div>

                <p style="margin-bottom: 15px; color: #6c757d;">
                    If you did not request a password reset, please ignore this email or
                    <a href="mailto:support@drivorides.com" style="color: #2196F3; text-decoration: none;">
                        contact our support team
                    </a> immediately.
                </p>

                <div style="border-top: 1px solid #e0e0e0; margin-top: 30px; padding-top: 20px;">
                    <p style="margin: 5px 0; font-size: 0.9em; color: #757575;">
                        Best regards,<br>
                        <strong style="color: #2e7d32;">Drivo Rides Support Team</strong>
                    </p>
                    <p style="margin: 5px 0; font-size: 0.8em; color: #9e9e9e;">
                        Need help? Reply to this email or call us at (555) 123-4567
                    </p>
                </div>
            </div>
        </div>
    `;
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

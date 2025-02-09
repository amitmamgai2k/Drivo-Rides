const captainModel = require('../models/captain.model');
const rideModel = require('../models/ride.model');
const {validationResult} = require('express-validator');
const captainService = require('../services/captain.service');
const BlacklistToken = require('../models/blacklistToken.model');
const rideService = require('../services/ride.service');
const bcrypt = require("bcrypt"); // Use bcrypt for hashing passwords
const sendMail = require('../utils/sendMail');
const uploadOnCloudinary = require('../utils/cloudinary');
const sendRegistrationMessage = require('../utils/sendSMS');
module.exports.registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const {email,password,mobileNumber,fullname,vehicle} = req.body;
        const isCaptainAlreadyExists = await captainModel.findOne({ email });
        if (isCaptainAlreadyExists) {
            return res.status(400).json({ error: "Captain already exists" });
        }
        if(!fullname || !email || !password || !mobileNumber || !vehicle) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const ProfilePictureLocalPath = req.file?.path;
       if (!ProfilePictureLocalPath) {
      return res.status(400).json({ error: "Profile picture is required" });
    }
    const ProfilePicture = await uploadOnCloudinary(ProfilePictureLocalPath);
    if (!ProfilePicture) {
      return res.status(400).json({ error: "Error uploading profile picture" });
    }

        const hashPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({
            email,
            password: hashPassword,
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            mobileNumber: mobileNumber,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            model: vehicle.model,
            vehicleType: vehicle.vehicleType,
            ProfilePicture: ProfilePicture.url

            });
            const token = await captain.generateAuthToken();
              await sendRegistrationMessage(mobileNumber, fullname.firstname, fullname.lastname);
        res.status(201).json({ captain, token });
    } catch (err) {
        console.error("Error registering captain:", err);
        res.status(500).json({ error: "Server error" });
    }
};
module.exports.loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = await captain.generateAuthToken();
        res.cookie('token',token,{httpOnly:true})
        res.status(200).json({ token, captain });
    } catch (err) {
        console.error("Error logging in captain:", err);
        res.status(500).json({ error: "Server error" });
    }
}
module.exports.logoutCaptain = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token||req.headers.authorization?.split(' ')[1];

    await BlacklistToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
};
module.exports.getProfile = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain.id);
        if (!captain) {
            return res.status(404).json({ error: "Captain not found" });
        }
        res.status(200).json({ captain });
    } catch (err) {
        console.error("Error getting captain profile:", err);
        res.status(500).json({ error: "Server error" });
    }
};
module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Find user by email
        const user = await captainModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const username = user.fullname.firstname + " " + user.fullname.lastname;

        // Generate OTP
        const otp = rideService.getOtp(4);
        user.otp = otp; // Save OTP in the database (assuming `otp` is a field in the user schema)
        user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

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
        const user = await captainModel.findOne({ email });
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
module.exports.deleteCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { captainId } = req.body;
        if(!captainId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const captain = await captainModel.findByIdAndDelete(captainId);
        if (!captain) {
            return res.status(404).json({ error: "Captain not found" });
        }
        res.status(200).json({ message: "Captain deleted successfully" });

    } catch (error) {
        console.error("Error deleting captain:", error);
        res.status(500).json({ error: "Server error" });

    }
}
module.exports.updateProfilePicture = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { captainId } = req.body;
        if(!captainId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const ProfilePictureLocalPath = req.file?.path;
        if(!ProfilePictureLocalPath) {
            return res.status(400).json({ error: "Profile picture is required" });
        }
        const ProfilePicture = await uploadOnCloudinary(ProfilePictureLocalPath);
        if(!ProfilePicture) {
            return res.status(400).json({ error: "Error uploading profile picture" });
        }

        const captain = await captainModel.findById(captainId);
        if (!captain) {
            return res.status(404).json({ error: "Captain not found" });
        }
        captain.ProfilePicture = ProfilePicture.url;
        await captain.save();
        res.status(200).json({ message: "Profile picture updated successfully" });

    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ error: "Server error" });

    }
}
module.exports.getRideHistory = async (req, res) => {
    if (res.headersSent) return;

    try {
        const { userId } = req.body;
        console.log("captain id",userId);
        if (!userId) return res.status(400).json({ error: "UserId is required" });
console.log('hhh');

        const rides = await rideModel.find({ captain: userId })
        .populate("captain")
            .populate("user")
            .lean();
        console.log("rides",rides);


        if (!rides?.length) return res.status(404).json({ message: "No rides found" });

        const rideHistory = rides.map(ride => ({
            rideID: ride._id,
            UserFirstName: ride.user?.fullname?.firstname,
            UserLastName: ride.user?.fullname?.lastname,
            UserMobileNumber: ride.user?.mobileNumber,
            UserProfilePicture: ride.user?.ProfilePicture,
            date: ride.createdAt,
            origin: ride.originText,
            destination: ride.destinationText,
            duration: ride.duration,
            distance: ride.distance,
            price: ride.price,
            orderId: ride.orderID,
            paymentID: ride.paymentID
        }));
        console.log('rideHistory',rideHistory);


        return res.status(200).json({ rideHistory });

    } catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({ error: "Server error aa raha hai ride History se" });
        }
    }
};


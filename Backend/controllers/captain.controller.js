const captainModel = require('../models/captain.model');
const {validationResult} = require('express-validator');
const captainService = require('../services/captain.service');
const BlacklistToken = require('../models/blacklistToken.model');
module.exports.registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email,password,fullname,vehicle} = req.body;
        const isCaptainAlreadyExists = await captainModel.findOne({ email });
        if (isCaptainAlreadyExists) {
            return res.status(400).json({ error: "Captain already exists" });
        }
        const hashPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({
            email,
            password: hashPassword,
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
            });
            const token = await captain.generateAuthToken();
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
        const captain = await captainModel.findOne({ email });
        if (!captain) {
            return res.status(404).json({ error: "Captain not found" });
        }
        const token = await captain.generatePasswordResetToken();
        await captain.save();
        res.status(200).json({ message: "Password reset token sent to email" });
    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(500).json({ error: "Server error" });
    }
};

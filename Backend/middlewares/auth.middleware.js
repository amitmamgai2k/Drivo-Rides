const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const adminModel = require('../models/admin.model');
const blacklistTokenModel = require('../models/blacklistToken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const isBlacklisted = await blacklistTokenModel.findOne({blacklistedToken: token});
        if (isBlacklisted) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = user;
        return next();
    } catch (err) {
        console.error("Error authenticating user:", err);
        res.status(500).json({ error: "Server error" });
    }
};
module.exports.authCaptain = async (req, res, next) => {
    try {
        const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
        console.log('token',token);

        if (!token) {
            return res.status(401).json({ error: " Unauthorized token " });
        }
        const isBlacklisted = await blacklistTokenModel.findOne({blacklistedToken: token});
        if (isBlacklisted) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decodedToken.id);
        if (!captain) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.captain = captain;
        return next();
    } catch (err) {
        console.error("Error authenticating captain:", err);
        res.status(500).json({ error: "Server error" });
    }
};
module.exports.authAdmin = async (req, res, next) => {
    try {
        const token =req.cookies.token || req.headers.authorization?.split(' ')[1];


        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const isBlacklisted = await blacklistTokenModel.findOne({blacklistedToken: token});
        if (isBlacklisted) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decodedToken.id);
        if (!admin) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.admin = admin;
        return next();
    } catch (err) {
        console.error("Error authenticating admin:", err);
        res.status(500).json({ error: "Server error" });
    }
};
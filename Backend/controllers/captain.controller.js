const captainModel = require('../models/captain.model');
const {validationResult} = require('express-validator');
const captainService = require('../services/captain.service');
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

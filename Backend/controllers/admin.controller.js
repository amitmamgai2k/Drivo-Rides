const adminModel = require('../models/admin.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.addAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await adminModel.hashPassword(password);

        const admin = new adminModel({ email, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: "Admin created successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error creating admin", error });
    }
};

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }


        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

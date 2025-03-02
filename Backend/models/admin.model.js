const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
});


adminSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


adminSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const adminModel = mongoose.model('Admin', adminSchema);
module.exports = adminModel;

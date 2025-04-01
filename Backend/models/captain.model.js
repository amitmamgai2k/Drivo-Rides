const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
            maxlength: 50
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
            maxlength: 50
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
            max: 4
        },
        model: {
            type: String,
            required: true
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['motorcycle', 'car', 'van', 'auto'],
        }
    },
    location: {
        latitude: {
            type: Number,
            default: undefined
        },
        longitude: {
            type: Number,
            default: undefined
        }
    },
    ProfilePicture: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    },
    otp: {
        type: Number
    },
    otpExpires: {
        type: Number
    },
    feedback: {
        type: Number,
        default: 0
    },


    todayHoursWorked: { type: Number, default: 0 },
    todayDistanceTravelled: { type: Number, default: 0 },
    todayRidesDone: { type: Number, default: 0 },
    todayEarnings: { type: Number, default: 0 },


    hoursWorked: {
        type: Number,
        default: 0,
        set: (value) => Math.round(value * 100) / 100
    },
    distanceTravelled: { type: Number, default: 0 },
    RideDone: { type: Number, default: 0 },
    TotalEarnings: { type: Number, default: 0 },


    lastReset: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


captainSchema.pre('save', function (next) {
    const now = new Date();
    const lastReset = new Date(this.lastReset);


    if (now.getUTCDate() !== lastReset.getUTCDate() ||
        now.getUTCMonth() !== lastReset.getUTCMonth() ||
        now.getUTCFullYear() !== lastReset.getUTCFullYear()) {

        this.todayHoursWorked = 0;
        this.todayDistanceTravelled = 0;
        this.todayRidesDone = 0;
        this.todayEarnings = 0;

        this.lastReset = now;
    }

    next();
});

captainSchema.methods.generateAuthToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const CaptainModel = mongoose.model('captain', captainSchema);
module.exports = CaptainModel;

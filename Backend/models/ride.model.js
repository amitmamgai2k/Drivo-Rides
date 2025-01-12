const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'onride','completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true ,
        select: false

    }
});

module.exports = mongoose.model('ride', rideSchema);

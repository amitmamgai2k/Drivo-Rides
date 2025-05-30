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
        default: null
    },
    payment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Payment',
        default:null
    },
    origin: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length === 2 &&
                       v.every(coord => typeof coord === 'number');
            },
            message: props => `${props.value} is not a valid coordinate pair!`
        }
    },
    destination: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length === 2 &&
                       v.every(coord => typeof coord === 'number');
            },
            message: props => `${props.value} is not a valid coordinate pair!`
        }
    },

    originText:{
        type: String,
    },

    destinationText:{
        type: String,
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    paymentID: {
        type: String,
        default: 0
    },
    orderID: {
        type: String,
        default: 0
    },
    paymentMethod: {
        type: String,
        default: 'Cash'
    },
    otp: {
        type: String,
        required: true,
        select: false
    },
    feedback:{
        type:Number,
        default:0
    }
}, {
    timestamps: true
});

const rideModel = mongoose.model('ride', rideSchema);
module.exports = rideModel
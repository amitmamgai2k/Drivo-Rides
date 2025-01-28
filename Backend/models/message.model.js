const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    rideId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ride'
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Message', messageSchema);
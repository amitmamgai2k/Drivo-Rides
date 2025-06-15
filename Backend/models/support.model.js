const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  resolved: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true });

const Support = mongoose.model('Support', messageSchema);

module.exports = Support;
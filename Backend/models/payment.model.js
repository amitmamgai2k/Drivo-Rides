const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },  // Cashfree Order ID
  paymentId: { type: String, required: true, unique: true },  // Cashfree Payment ID
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true }, // Link to Ride
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who paid
  captainId: { type: mongoose.Schema.Types.ObjectId, ref: "Captain", required: true }, // Captain assigned to ride
  amount: { type: Number, required: true }, // Total order amount
  paymentMethod: { type: String, required: true }, // UPI, Card, Netbanking, etc.
  upiId: { type: String, default: null }, // UPI ID if applicable
  paymentStatus: { type: String, enum: ["SUCCESS", "FAILED", "PENDING"], required: true }, // Payment status
  bankReference: { type: String, default: null }, // Bank reference number
  gatewayName: { type: String, default: null }, // Payment gateway name
  paymentTime: { type: Date, required: true }, // Time when payment was initiated
  completionTime: { type: Date, default: null }, // Time when payment was completed
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;

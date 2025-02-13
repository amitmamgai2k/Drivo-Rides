const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // Unique coupon code
  discount: { type: Number, required: true }, // Discount amount or percentage
  type: { type: String, enum: ["fixed", "percentage"], required: true }, // Type of discount
  expirationDate: { type: Date, required: true }, // Expiry date
  isActive: { type: Boolean, default: true } // Coupon status
});

const CouponModel = mongoose.model("Coupon", couponSchema);
module.exports = CouponModel;

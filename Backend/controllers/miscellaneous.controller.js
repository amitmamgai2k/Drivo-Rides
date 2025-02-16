const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const CuponModel = require('../models/couponcode.model.js');
const UserModel = require('../models/user.model.js');

module.exports.sendMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    try {
        const { name, email, message, mobileNumber } = req.body;
        if (!name || !email || !message || !mobileNumber) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const messageData = await userService.createMessage({ name, email, message, mobileNumber });
        res.status(200).json({ messageData });

    } catch (error) {

    }
}
module.exports.getCuponCode = async (req, res) => {
    try {
        const userId = req.user.id;
        const cuponCode = await CuponModel.aggregate([
            { $match: { isActive: true } }, // Only active coupons
            { $sample: { size: 1 } } // Get 1 random document
        ]);


        if (cuponCode.length === 0) {
            return res.status(404).json({ message: "No active coupons available" });
        }
        const selectedCoupon = cuponCode[0];
        // Update the user with the fetched coupon code and its expiry
        await UserModel.findByIdAndUpdate({_id:userId}, {
            couponCode: selectedCoupon.code,
            couponExpiry: selectedCoupon.expirationDate
        });
        console.log("Random Coupon Code:", cuponCode[0].code);

        res.status(200).json(cuponCode[0].code);
    } catch (error) {
        console.error("Error fetching random coupon:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
module.exports.validateCouponCode = async (req, res) => {
    try {
        const userId = req.user.id;
        const {  couponCodes } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.couponCode === couponCodes && Date.now() < user.couponExpiry) {
            res.status(200).json({ message: "Coupon code is valid" });
        } else {
            res.status(400).json({ message: "Invalid coupon code" });
        }
    } catch (error) {
        console.error("Error validating coupon code:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
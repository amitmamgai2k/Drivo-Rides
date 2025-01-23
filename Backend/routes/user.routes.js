const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('mobileNumber').isNumeric().isLength({ min: 10, max: 10 }).withMessage('Mobile number must be a numeric value'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.registerUser);
router.post('/login',[body('email').isEmail().withMessage('Please enter a valid email'),body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')], userController.loginUser);
router.get('/profile',authMiddleware.authUser, userController.getUserProfile);
router.get('/logout',authMiddleware.authUser, userController.logoutUser);
router.post('/forgot-password', [
    body('email').isEmail().withMessage('Please enter a valid email'),
], userController.forgotPassword);

router.post('/verify-otp', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('enteredOtp').isLength({ min: 4, max: 4 }).withMessage('Invalid OTP'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

], userController.verifyOtp);

module.exports = router;


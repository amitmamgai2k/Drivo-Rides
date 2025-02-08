const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const upload  = require('../middlewares/multer.middleware');


router.post(
    '/register',
    upload.single('ProfileImage'), // Handle file upload
    (req, res, next) => {
        try {
            // Parse JSON fields if they exist
            if (req.body.fullname && typeof req.body.fullname === 'string') {
                req.body.fullname = JSON.parse(req.body.fullname);
            }
            if (req.body.vehicle && typeof req.body.vehicle === 'string') {
                req.body.vehicle = JSON.parse(req.body.vehicle);
            }
            next();
        } catch (err) {
            console.error('Error parsing JSON:', err.message);
            return res.status(400).json({ message: 'Invalid JSON format for fullname or vehicle' });
        }
    },
    [
        // Validation for fields
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('fullname.firstname')
            .isLength({ min: 3 })
            .withMessage('First name must be at least 3 characters long'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        body('mobileNumber')
            .isNumeric()
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number must be a numeric value'),
        body('vehicle.color')
            .isLength({ min: 3 })
            .withMessage('Color must be at least 3 characters long'),
        body('vehicle.plate')
            .isLength({ min: 3 })
            .withMessage('Plate must be at least 3 characters long'),
        body('vehicle.capacity')
            .isInt({ min: 1, max: 4 })
            .withMessage('Capacity must be between 1 and 4'),
        body('vehicle.vehicleType')
            .isIn(['motorcycle', 'car', 'van', 'auto'])
            .withMessage('Invalid vehicle type'),
        body('vehicle.model')
            .isLength({ min: 3 })
            .withMessage('Model must be at least 3 characters long'),
    ],
    captainController.registerCaptain
);

router.post('/login',[  body('email').isEmail().withMessage('Please enter a valid email'),
body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')], captainController.loginCaptain);
router.get('/profile', authMiddleware.authCaptain,captainController.getProfile);
router.get('/logout', authMiddleware.authCaptain,captainController.logoutCaptain);
router.post('/forgot-password', [
    body('email').isEmail().withMessage('Please enter a valid email'),
], captainController.forgotPassword);

router.post('/verify-otp', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('enteredOtp').isLength({ min: 4, max: 4 }).withMessage('Invalid OTP'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

], captainController.verifyOtp);
router.delete('/delete', authMiddleware.authCaptain,captainController.deleteCaptain);
router.post('/update-profile-picture', authMiddleware.authCaptain,upload.single('ProfileImage'), captainController.updateProfilePicture);
router.get('/ride-history', authMiddleware.authCaptain, captainController.getRideHistory);

module.exports = router;
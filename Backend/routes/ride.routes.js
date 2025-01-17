const express = require('express');
const router = express.Router();
const { body,query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Validation middleware
const validateCoordinates = (value) => {
    if (!Array.isArray(value) || value.length !== 2 ||
        !value.every(coord => typeof coord === 'number' && !isNaN(coord))) {
        throw new Error('Invalid coordinates format. Expected [longitude, latitude]');
    }
    return true;
};

router.post('/create',
    authMiddleware.authUser,
    [
        body('origin')
            .isArray()
            .custom(validateCoordinates)
            .withMessage('Origin must be valid coordinates [longitude, latitude]'),
        body('destination')
            .isArray()
            .custom(validateCoordinates)
            .withMessage('Destination must be valid coordinates [longitude, latitude]'),
        body('vehicleType')
            .isIn(['auto', 'car', 'motorcycle'])
            .withMessage('Invalid vehicle type. Must be auto, car, or motorcycle')
    ],
    rideController.createRide
);


router.get('/get-fare',
    authMiddleware.authUser,
    [
        query('originLat')
            .isFloat()
            .withMessage('Origin latitude must be a valid number'),
        query('originLng')
            .isFloat()
            .withMessage('Origin longitude must be a valid number'),
        query('destinationLat')
            .isFloat()
            .withMessage('Destination latitude must be a valid number'),
        query('destinationLng')
            .isFloat()
            .withMessage('Destination longitude must be a valid number'),
    ],
    rideController.getFare
);
router.post('/confirm',authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),

    rideController.confirmRide);

module.exports = router;
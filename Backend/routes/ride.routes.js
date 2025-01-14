const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
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

module.exports = router;
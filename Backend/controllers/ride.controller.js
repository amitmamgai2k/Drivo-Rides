const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

const createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                errors: errors.array()
            });
        }

        const { origin, destination, vehicleType } = req.body;

        const ride = await rideService.createRide(
            req.user,
            origin,
            destination,
            vehicleType
        );

        return res.status(201).json({
            status: 'success',
            data: {
                ride: {
                    id: ride._id,
                    status: ride.status,
                    price: ride.price,
                    distance: ride.distance,
                    duration: ride.duration,
                    vehicleType: ride.vehicleType,
                    otp: ride.otp
                }
            }
        });

    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(error.status || 500).json({
            status: 'error',
            message: error.message || 'Internal server error'
        });
    }
};

const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }

    try {
        const { originLat, originLng, destinationLat, destinationLng } = req.query;

        // Create coordinate arrays
        const origin = [parseFloat(originLng), parseFloat(originLat)];
        const destination = [parseFloat(destinationLng), parseFloat(destinationLat)];

        const fareResponse = await rideService.getFare(origin, destination);
         const { auto, car, motorcycle } = fareResponse.fare;
        return res.status(200).json({
            auto, car, motorcycle

        });
    } catch (error) {
        console.error('Error getting fare:', error);
        return res.status(error.status || 500).json({
            status: 'error',
            message: error.message || 'Internal server error'
        });
    }
};

module.exports = {  createRide, getFare };
const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

class RideController {
    async createRide(req, res) {
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
                        otp : ride.otp

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
    }
}

module.exports = new RideController();
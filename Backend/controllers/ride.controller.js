const rideService = require('../services/ride.service');
const mapsService = require('../services/maps.service');
const rideModel = require('../models/ride.model');
const { validationResult } = require('express-validator');
const { sendMessageToSocketId } = require('../socket');

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

         res.status(201).json({

                    UserId: ride._id,
                    origin: ride.origin,
                    destination: ride.destination,
                    status: ride.status,
                    price: ride.price,
                    distance: ride.distance,
                    duration: ride.duration,
                    vehicleType: ride.vehicleType,
                    otp: ride.otp

        });

                const captainsInRadius = await mapsService.getCaptainInTheRadius(origin[1], origin[0], 1);
                console.log("Found captains in radius:", captainsInRadius);

                const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
                console.log("Ride with user data:", rideWithUser);

                captainsInRadius.forEach(captain => {
                    console.log(`Attempting to send ride to captain ${captain._id} with socketId ${captain.socketId}`);
                    if (captain.socketId) {
                        sendMessageToSocketId(captain.socketId, {
                            event: 'new-ride',
                            data: rideWithUser
              })
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
const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }
    try {
        const { rideId} = req.body;
        const ride = await rideService.confirmRide({rideId, captainId: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride

        })
        return res.status(200).json({
            status: 'success',
            message: 'Ride confirmed successfully',
            data: ride
        });
    } catch (error) {
        console.error('Error confirming ride:', error);
        return res.status(error.status || 500).json({
            status: 'error',
            message: error.message || 'Internal server error'
        });
    }


}


module.exports = {  createRide, getFare,confirmRide };
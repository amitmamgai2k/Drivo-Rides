const { get } = require('http');
const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

// Constants for fare calculation
const BASE_FARE = {
    auto: 30,
    car: 50,
    motorcycle: 20
};

const FARE_PER_KM = {
    auto: 10,
    car: 15,
    motorcycle: 8
};

// Helper function to get OTP
const getOtp = (digits = 4) => {
    return crypto.randomInt(Math.pow(10, digits - 1), Math.pow(10, digits)).toString();
};

// Function to calculate fare
const getFare = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Missing required fields for fare calculation');
    }

    const distanceTime = await mapService.getDistanceTimeForRide(origin, destination);

    const fare = {
        auto: BASE_FARE.auto + (FARE_PER_KM.auto * distanceTime.distance),
        car: BASE_FARE.car + (FARE_PER_KM.car * distanceTime.distance),
        motorcycle: BASE_FARE.motorcycle + (FARE_PER_KM.motorcycle * distanceTime.distance)
    };

    // Round fares to 2 decimal places
    Object.keys(fare).forEach(key => {
        fare[key] = Math.round(fare[key] * 100) / 100;
    });

    return {
        fare,
         distanceTime
    };
};

// Function to create a ride
const createRide = async (user, origin, destination, vehicleType) => {
    if (!user || !origin || !destination || !vehicleType) {
        throw new Error('Missing required fields for ride creation');
    }
    // const originCoordinates = await mapService.getAddressCoordinates(origin);
    //     // Then get coordinates for destination
    //     const destinationCoordinates = await mapService.getAddressCoordinates(destination);

    //     // Extract coordinates from responses
    //     const originCoords = [originCoordinates.longitude, originCoordinates.latitude];
    //     const destinationCoords = [destinationCoordinates.longitude, destinationCoordinates.latitude];
    if (!['auto', 'car', 'motorcycle'].includes(vehicleType)) {
        throw new Error('Invalid vehicle type');
    }

    const { fare, distanceTime } = await getFare(origin, destination);

    const ride = await rideModel.create({
        user: user._id,
        origin,
        destination,
        // originText: origin,
        // destinationText: destination,
        price: fare[vehicleType],
        duration: distanceTime.duration,
        distance: distanceTime.distance,
        otp: getOtp(4),
        status: 'pending'
    });

    console.log(ride);
    return ride;
};
const confirmRide = async (rideId,captain) => {
    if(!rideId){
        throw new Error('Missing required fields for ride creation');
    }
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'accepted',captain :captain._id });
    const ride   = await rideModel.findOne({_id:ride}).populate('user');
    if(!ride){
        throw new Error('Ride not found');
    }
    ride.status = 'accepted';

    return ride.save();
}




module.exports = {
    getFare,
    getOtp,
    createRide,
    confirmRide
};
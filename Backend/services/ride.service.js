const { get } = require('http');
const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

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
const createRide = async (user, origin, destination, vehicleType,Ridefare) => {
    console.log("Origin:", origin, "Destination:", destination, "Vehicle Type:", vehicleType, "User:", user);

    if (!user || !origin || !destination || !vehicleType ) {
        throw new Error('Missing required fields for ride creation');
    }
    const originCoordinates = await mapService.getAddressCoordinates(origin);
        // Then get coordinates for destination
        const destinationCoordinates = await mapService.getAddressCoordinates(destination);

        // Extract coordinates from responses
        const originCoords = [originCoordinates.longitude, originCoordinates.latitude];
        const destinationCoords = [destinationCoordinates.longitude, destinationCoordinates.latitude];
    if (!['auto', 'car', 'motorcycle'].includes(vehicleType)) {
        throw new Error('Invalid vehicle type');
    }

    const distanceTime = await mapService.getDistanceTimeForRide(originCoords, destinationCoords);

    try {
            const ride = await rideModel.create({
            user: user._id,
            origin: originCoords,
            destination: destinationCoords,
            originText: origin,
            destinationText: destination,
            price: Ridefare,
            duration: distanceTime.duration.toFixed(2),
            distance: distanceTime.distance,
            otp: getOtp(4),
            status: 'pending'
        });

        console.log('Ride created successfully:', ride);
        return ride;
    } catch (error) {
        console.error('Error saving ride to database:', error);
        throw new Error('Ride creation failed');
    }

};
const confirmRide = async ({ rideId, captain }) => {
    if (!rideId || !captain) {
        throw new Error('Missing required fields for ride confirmation');
    }
    console.log('Captain ID backend:', captain._id); // Log captain ID
    // Update ride with captain and status
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'accepted', captain: captain._id },
        { new: true }

    );

    // Fetch the updated ride and populate user
    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    console.log('Ride found:', ride);


    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};


 const startRide = async ({ rideId, otp ,captain}) => {
    console.log("rideId",rideId,"otp",otp,"captain",captain);

    if (!rideId || !otp) {
        throw new Error('Missing required fields for ride start');
    }

    // Update ride with captain and status
    const ride =await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }
    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }
    if(ride.status !== 'accepted'){
        throw new Error('Ride is not accepted');
    }
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'ongoing' },
        { new: true }

    )
    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride,
    });

    return ride;


 }
 const endRide = async ({ rideId, captain }) => {
    if (!rideId || !captain) {
        throw new Error('Missing required fields for ride end');
    }


    // Update ride with captain and status
    console.log(rideId,captain._id);


    // Fetch the updated ride and populate user
    const ride = await rideModel.findOne({ _id: rideId ,captain:captain._id}).populate('user').populate('captain');



if (ride && ride.captain._id.toString() !== captain._id.toString()) {
    throw new Error('Captain mismatch for this ride');
}


    if (!ride) {
        throw new Error('Ride not found');
    }
   if(ride.status !== 'ongoing'){
    throw new Error('Ride is not ongoing');
   }
   await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: 'completed' }
);
    return ride;
 }
module.exports = {
    getFare,
    getOtp,
    createRide,
    confirmRide,
    startRide,
    endRide
};
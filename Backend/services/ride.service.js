const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require('crypto');

async function getFare(origin,destination){
    if(!origin||!destination){
        throw new Error('Missing required fields');
    }
    const distanceTime = await mapService.getDistanceTime(origin,destination);

    const baseFare = {
        auto:30,
        car:50,
        motorcycle:20
    } // base fare in currency units
    const farePerKm = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const fare = {
        auto: baseFare.auto + (farePerKm.auto * distanceTime.distance),
        car: baseFare.car + (farePerKm.car * distanceTime.distance),
        motorcycle: baseFare.motorcycle + (farePerKm.motorcycle * distanceTime.distance)
    };

    return fare;
}
function getOtp(num){
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}
module.exports.createRide = async (user,origin,destination,vehicleType)=> {
    if(!user||!origin||!destination||!vehicleType){
        throw new Error('Missing required fields');
    }
    const fare = await getFare(origin,destination);
    const ride = rideModel.create({
        user:user._id,
        origin, // Address passed as query parameter
        destination, // Address passed as query parameter
         fare   : fare[vehicleType],
         otp:getOtp(4),

    }
    );
    return ride;


}
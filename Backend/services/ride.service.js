const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

class RideService {
    constructor() {
        this.baseFare = {
            auto: 30,
            car: 50,
            motorcycle: 20
        };
        this.farePerKm = {
            auto: 10,
            car: 15,
            motorcycle: 8
        };
    }

    async getFare(origin, destination) {
        if (!origin || !destination) {
            throw new Error('Missing required fields for fare calculation');
        }

        const distanceTime = await mapService.getDistanceTimeForRide(origin, destination);

        const fare = {
            auto: this.baseFare.auto + (this.farePerKm.auto * distanceTime.distance),
            car: this.baseFare.car + (this.farePerKm.car * distanceTime.distance),
            motorcycle: this.baseFare.motorcycle + (this.farePerKm.motorcycle * distanceTime.distance)
        };

        // Round fares to 2 decimal places
        Object.keys(fare).forEach(key => {
            fare[key] = Math.round(fare[key] * 100) / 100;
        });

        return {
            fare,
            distanceTime
        };
    }

    getOtp(digits = 4) {
        return crypto.randomInt(Math.pow(10, digits - 1), Math.pow(10, digits)).toString();
    }

    async createRide(user, origin, destination, vehicleType) {
        if (!user || !origin || !destination || !vehicleType) {
            throw new Error('Missing required fields for ride creation');
        }

        if (!['auto', 'car', 'motorcycle'].includes(vehicleType)) {
            throw new Error('Invalid vehicle type');
        }

        const { fare, distanceTime } = await this.getFare(origin, destination);

        const ride = await rideModel.create({
            user: user._id,
            origin,
            destination,
            price: fare[vehicleType],
            duration: distanceTime.duration,
            distance: distanceTime.distance,
            otp: this.getOtp(4),
            status: 'pending'
        });
        console.log(ride);

        return ride;
    }
}

module.exports = new RideService();
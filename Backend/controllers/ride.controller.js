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

        const { origin, destination, vehicleType,Ridefare } = req.body;
        console.log("Origin:", origin, "Destination:", destination, "Vehicle Type:", vehicleType, 'rIDEFARE',Ridefare);


        const ride = await rideService.createRide(
            req.user,
            origin,
            destination,
            vehicleType,
            Ridefare

        );

         res.status(201).json(ride);


        const originCoords = await mapsService.getAddressCoordinates(origin);
        console.log("Origin coordinates:", originCoords.latitude,originCoords.longitude);






                const captainsInRadius = await mapsService.getCaptainInTheRadius(originCoords.latitude, originCoords.longitude, 200, vehicleType);
                console.log("Found captains in radius:", captainsInRadius);
                 ride.otp = ""

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
            errors: errors.array(),
        });
    }

    const { rideId } = req.body;

    try {
        // Assuming `req.captain` contains the captain object
        const ride = await rideService.confirmRide({
            rideId,
            captain: req.captain,
        });

        // Notify the user via socket
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride,
        });

        return res.status(200).json({
            status: 'success',
            message: 'Ride confirmed successfully',
            data: ride,
        });
    } catch (error) {
        console.error('Error confirming ride:', error);
        return res.status(error.status || 500).json({
            status: 'error',
            message: error.message || 'Internal server error',
        });
    }
};
const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array(),
        });
    }
    const{rideId,otp} = req.query;

    try {
        console.log("captain in confrim ride popup", req.captain);

        // Assuming `req.captain` contains the captain object
        const ride = await rideService.startRide({
            rideId,
            captain: req.captain,
            otp
        });

        // Notify the user via socket
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride,
        });

        return res.status(200).json({
            status: 'success',
            message: 'Ride started successfully',
            data: ride,
        });
    } catch (error) {
        console.error('Error starting ride:', error);
        return res.status(error.status || 500).json({
            status: 'error',
            message: error.message || 'Internal server error',
        });
    }
}
const cancelRide = async(req,res)=>{
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: erros.array(),
        });
    }
    try {
    const {rideId} = req.body;
  if(!rideId){
    console.log('Ride Id is Required For Cancle a Ride');
  }

  const cancleRide = await rideModel.findByIdAndUpdate(rideId,{$set:{status:'cancelled'}}).populate('user').populate('captain');

  if(!cancleRide){
    console.log('Ride Not Found')

  }
  console.log('cancleRide',cancleRide);

  sendMessageToSocketId(cancleRide.captain.socketId, {
    event: 'ride-cancelled',
    data:cancleRide
});

  return res.status(200).json({
    status: 'success',
    message: 'Ride Cancelled Successfully',
  });


    }
    catch(error){
        console.log('Error Cancle Ride',error);
        return res.status(error.status || 500).json({
            status: 'error',
            message: error.message || 'Internal server error',
        });


    }
}
const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array(),
        });
    }
    const{rideId} = req.body;


    try {

        const ride = await rideService.endRide({
            rideId,
            captain: req.captain,
        });

        // Notify the user via socket
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride,
        });

        return res.status(200).json({
            status: 'success',
            message: 'Ride ended successfully',
            data: ride,
        });
    } catch (error) {
        console.error('Error ending ride:', error);
        return res.status(error.status || 500).json({
            status: 'error',
            message: error.message || 'Internal server error',
        });
    }
}



module.exports = {  createRide, getFare,confirmRide,startRide,endRide,cancelRide };
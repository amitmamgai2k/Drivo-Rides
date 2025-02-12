const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');



module.exports.getAddressCoordinates = async (req, res) => {
    // Validate the incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const address = req.query.address; // Address passed as a query parameter
        const {latitude, longitude} = await mapsService. getAddressCoordinates(address); // Fetch eLoc using the updated service function

        res.status(200).json({

         latitude,
         longitude
        });
    } catch (error) {
        console.error("Error fetching eLoc:", error.message);
        res.status(500).json({
            success: false,
            error: "Unable to fetch eLoc"
        });
    }
};



module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Extract locations from the request body
        const locations = req.body.locations;

        if (!locations || !Array.isArray(locations) || locations.length < 2) {
            return res.status(400).json({
                error: 'Invalid input: A minimum of two locations is required to calculate distance and time.'
            });
        }

        // Call the service function to get the distance and time
        const distanceTime = await mapsService.getDistanceTime(locations);

        // Respond with the success message and distance/time data
        res.status(200).json({
            success: true,
            message: "Distance and time fetched successfully",
            data: distanceTime, // Return the full response from the service
        });
    } catch (error) {
        console.error("Error fetching distance and time:", error.message);
        res.status(500).json({
            error: "Unable to fetch distance and time",
            details: error.message // Optionally include error details
        });
    }
};


module.exports.getSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const address = req.query.address; // Address passed as query parameter
        const suggestions = await mapsService.getSuggestions(address);
        res.status(200).json({

            data: suggestions,
        });
    } catch (error) {
        console.error("Error fetching suggestions:", error.message);
        res.status(500).json({ error: "Unable to fetch suggestions" });
    }
};
module.exports.getCurrentLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {longitude,latitude} = req.body;
        const currentLocation = await mapsService.getCurrentLocation(longitude,latitude);
        console.log("Current Location:", currentLocation);

        res.status(200).json({
            data: currentLocation,
        });
    } catch (error) {
        console.error("Error fetching current location:", error.message);
        res.status(500).json({ error: "Unable to get current location" });
    }
};

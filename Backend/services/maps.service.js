const axios = require('axios');
const CaptainModel = require('../models/captain.model');
module.exports.getAddressCoordinates = async (address) => {
    try {
        const apiKey = process.env.MAPS_API; // Your API key stored in an environment variable

        const response = await axios.get('https://api.openrouteservice.org/geocode/search', {
            params: {
                text: address, // Pass the address as the 'text' parameter
                api_key: apiKey, // Include the API key as a parameter
            },
        });

        // Log the full response data to inspect the structure


        // Validate and extract coordinates from the first feature
        if (response.data && response.data.features && response.data.features.length > 0) {
            const feature = response.data.features[0]; // Get the first feature
            const { coordinates } = feature.geometry; // Extract coordinates from the geometry

            if (coordinates && Array.isArray(coordinates) && coordinates.length === 2) {
                // Coordinates are in [longitude, latitude] format
                const [longitude, latitude] = coordinates;
                return { latitude, longitude }; // Return coordinates as an object
            } else {
                throw new Error('Coordinates are not valid.');
            }
        } else {
            throw new Error('No valid features found for the given address.');
        }
    } catch (error) {
        // Enhanced error logging for debugging
        if (error.response) {
            console.error("API Error Status:", error.response.status);
            console.error("API Error Data:", error.response.data);
        } else {
            console.error("Error Message:", error.message);
        }
        throw new Error('Unable to fetch coordinates');
    }
};

module.exports.getDistanceTime = async (locations) => {
    if (!locations || !Array.isArray(locations) || locations.length < 2) {
        throw new Error('Invalid locations input: At least two locations are required.');
    }

    const apiKey = process.env.MAPS_API; // API key stored in environment variables
    const url = `https://api.openrouteservice.org/v2/matrix/driving-car`; // API endpoint

    try {
        // Make API request
        const response = await axios.post(
            url,
            { locations }, // Pass the locations in the request body
            {
                headers: {
                    Authorization: apiKey, // Set the API key in headers
                    'Content-Type': 'application/json', // Specify the content type
                },
            }
        );

        // Return the whole response data
        return response.data;
    } catch (error) {
        // Enhanced error logging
        if (error.response) {
            console.error('API Response Error:', error.response.data);
        } else {
            console.error('Error Message:', error.message);
        }
        throw new Error('Unable to fetch distance and time.');
    }
};
module.exports.getSuggestions = async (address) => {
    if (!address) {
        throw new Error('Missing required fields');
    }

    try {
        const apiKey = process.env.MAPS_API; // API key stored in an environment variable

        // Send the request to OpenRouteService's autocomplete endpoint
        const response = await axios.get('https://api.openrouteservice.org/geocode/autocomplete', {
            params: {
                text: address, // The address you want to search for suggestions
                api_key: apiKey, // Your API key for the request
            },
        });

        // Log the response data for inspection


        // Check if there are any features in the response
       return response.data.features.map((feature) => feature.properties.name);
        }
     catch (error) {
        // Enhanced error handling for debugging
        if (error.response) {
            console.error("API Error Status:", error.response.status);
            console.error("API Error Data:", error.response.data);
        } else {
            console.error("Error Message:", error.message);
        }
        throw new Error('Unable to fetch address suggestions');
    }
};
module.exports.getDistanceTimeForRide = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Both origin and destination coordinates are required.');
    }

    const apiKey = process.env.MAPS_API;
    const url = 'https://api.openrouteservice.org/v2/matrix/driving-car';

    try {
        // Format coordinates as [longitude, latitude]
        const coordinates = [
            origin,      // [longitude, latitude] of origin
            destination  // [longitude, latitude] of destination
        ];

        const response = await axios.post(
            url,
            {
                locations: coordinates,
                metrics: ["distance", "duration"],
                units: "km"
            },
            {
                headers: {
                    Authorization: apiKey,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Extract distance and duration from matrix response
        // Matrix response format: [[0,d],[d,0]] where d is the value
        const distance = parseFloat(response.data.distances[0][1]).toFixed(1);    // Distance in kilometers
        const duration = response.data.durations[0][1]; // Duration in seconds

        return {
            distance,
            duration: duration / 60 // Convert to minutes
        };
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        throw new Error('Unable to fetch distance and time.');
    }
};
module.exports.getCaptainInTheRadius = async (latitude, longitude, radius) => {
    const captains = await CaptainModel.find({
        location:{
            $geoWithin: {
                $centerSphere:[[longitude, latitude], radius/6371] // Radius in kilometers
        }

}
    });
    return captains;
}
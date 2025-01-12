const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');

// Route for getting coordinates from an address
router.get(
    '/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    mapController.getAddressCoordinates
);
const { body } = require('express-validator');

router.post(
    '/get-distance-time',
    body('locations')
        .isArray({ min: 2 }) // Validate that 'locations' is an array with at least two elements
        .withMessage('The locations field must be an array with at least two coordinate pairs.'),
    body('locations.*') // Validate each element in the array
        .isArray({ min: 2, max: 2 })
        .withMessage('Each location must be an array with exactly two numeric values [longitude, latitude].')
        .custom((value) => value.every((coord) => typeof coord === 'number'))
        .withMessage('Each coordinate in the location array must be a number.'),
    mapController.getDistanceTime
);

router.get('/get-suggestions',
    query('address').isString().isLength({ min: 3 }),
    mapController.getSuggestions
)
module.exports = router;

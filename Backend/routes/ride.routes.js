const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.post('/create',
  authMiddleware.authUser  ,
    body('origin').isString().isLength({ min: 3 }).withMessage('Invalid origin'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination'),
    body('vehicleType').isIn(['moto', 'car', 'auto']).withMessage('Invalid vehicle type'),
    rideController.createRide


)

module.exports = router;
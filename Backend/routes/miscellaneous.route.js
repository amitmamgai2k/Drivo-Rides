const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const miscellaneousController = require('../controllers/miscellaneous.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');


 router.post('/send-message', miscellaneousController.sendMessage);
 router.post('/get-cupon-code',authMiddleware.authUser,miscellaneousController.getCuponCode);
router.post('/validate-coupon-code',authMiddleware.authUser,miscellaneousController.validateCouponCode);

module.exports = router;


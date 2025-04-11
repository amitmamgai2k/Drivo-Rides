const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authAdmin } = require('../middlewares/auth.middleware');

const authMiddleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
router.post("/create-admin", adminController.addAdmin);
router.post('/login',adminController.login);
router.get('/dashboard/metrics',authAdmin, adminController.getMetricsData);

module.exports = router;


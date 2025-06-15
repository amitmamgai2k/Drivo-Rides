const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authAdmin } = require('../middlewares/auth.middleware');

const authMiddleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
router.post("/create-admin", adminController.addAdmin);
router.post('/login',adminController.login);
router.get('/dashboard/metrics',authAdmin, adminController.getMetricsData);
router.get('/dashboard/recentRides',authAdmin, adminController.getRecentRides);
router.get('/dashboard/recentRides/:rideId',authAdmin, adminController.getRideDataWithID);
router.get('/dashboard/captains/:id?',authAdmin, adminController.getCaptainsData);
router.get('/dashboard/users/:id?',authAdmin, adminController.getUsersData);
router.post('/users/:id', authAdmin, adminController.updateUserData);
router.delete('/users/:id', authAdmin, adminController.deleteUser);
router.post('/captains/:id', authAdmin, adminController.updateCaptainData);
router.delete('/captains/:id', authAdmin, adminController.deleteCaptain);
router.get('/dashboard/ridesStatus', authAdmin, adminController.getRidesStatus);
router.get('/dashboard/supportTickets', authAdmin, adminController.getSupportTickets);
router.post('/dashboard/supportTickets/:ticketId/resolve', authAdmin, adminController.resolveSupportTicket);
router.get('/dashboard/monthlyData', authAdmin, adminController.getMonthlyData);
router.get('/dashboard/weeklyRides', authAdmin, adminController.getWeeklyRides);
router.get('/dashboard/payments', authAdmin, adminController.getPaymentsData);

module.exports = router;


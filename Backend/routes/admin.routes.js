const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
router.post("/create-admin", adminController.addAdmin);
router.post('/login',adminController.login);

module.exports = router;


const express = require('express');
const router = express.Router();
const offeringController = require('../controllers/offeringsController');
const auth = require('../controllers/authController.js');

// Create offering
router.post('/create', auth.protect, offeringController.createOffering);

// Get offerings
router.get('/', auth.protect, offeringController.getOfferings);

module.exports = router;

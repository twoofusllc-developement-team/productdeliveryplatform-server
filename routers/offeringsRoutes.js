const express = require('express');
const router = express.Router();
const offeringController = require('../controllers/offeringsController');
const auth = require('../controllers/authController.js');


router.post('/create', auth.protect, offeringController.createOffering);


router.get('/', auth.protect, offeringController.getOfferings);

module.exports = router;
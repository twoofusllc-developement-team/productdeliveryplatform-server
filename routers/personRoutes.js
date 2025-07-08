const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router.post('/createPerson', personController.createPerson);

module.exports = router;

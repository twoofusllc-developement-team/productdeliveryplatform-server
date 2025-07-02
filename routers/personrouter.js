const express = require('express');
const router = express.Router();

const personController = require('../controllers/personController');

// Route to create a person
// POST /api/persons/create
router.post('/create', personController.createPerson);

module.exports = router;

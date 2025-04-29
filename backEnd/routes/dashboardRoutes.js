const express = require('express');
const { getDashboard } = require('../controllers/dashboardController'); // Import the controller

const router = express.Router();

// Route to get victim's dashboard data
router.get('/dashboard', getDashboard);

module.exports = router;

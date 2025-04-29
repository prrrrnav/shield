const express = require('express');
const router = express.Router();
const warningController = require('../controllers/warningController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin issues warning
router.post('/issue', authMiddleware, warningController.issueWarning);

// Harasser submits explanation
router.post('/explain', warningController.submitExplanation);

module.exports = router;

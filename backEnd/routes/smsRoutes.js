const express = require('express');
const router = express.Router();
const { sendSMS } = require('../controllers/smsController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected POST route to send SMS
router.post('/send-sms', authMiddleware, sendSMS);

module.exports = router;

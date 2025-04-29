const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Create new harassment report (Girl submits)
router.post('/create', authMiddleware, upload.fields([
    { name: 'evidenceImages', maxCount: 5 },
    { name: 'evidenceVideos', maxCount: 2 },
    { name: 'evidenceAudios', maxCount: 2 }
]), reportController.createReport);

// Get all reports (Admin viewing)
router.get('/all', authMiddleware, reportController.getAllReports);

module.exports = router;

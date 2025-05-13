const express = require('express');
const reportController = require('../controllers/reportController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Initialize the router
const router = express.Router();


// Create new harassment report (Girl submits)
router.post('/create', 
  authMiddleware, 
  upload.fields([
    { name: 'evidenceImages', maxCount: 5 },
    { name: 'evidenceVideos', maxCount: 2 },
    { name: 'evidenceAudios', maxCount: 2 }
  ]), 
  reportController.createReport
);

// Get all reports (Admin viewing)
router.get('/all', authMiddleware, reportController.getAllReports);


module.exports = router;

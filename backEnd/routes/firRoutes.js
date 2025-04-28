const express = require('express');
const router = express.Router();
const firController = require('../controllers/firController');
const authMiddleware = require('../middlewares/authMiddleware');

// Lodge FIR after 3rd warning with girl's permission
router.post('/lodge', authMiddleware, firController.lodgeFIR);

module.exports = router;

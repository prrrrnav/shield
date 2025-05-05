const express = require("express");
const { uploadFiles } = require("../middleware/upload.js");
const { uploadFile } = require("../controllers/uploadController.js");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST route to upload files
router.post("/upload",authMiddleware, uploadFiles, uploadFile);

module.exports = router;

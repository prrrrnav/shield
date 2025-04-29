const express = require('express');
const router = express.Router();
const { uploadFiles } = require('../controllers/uploadController');

router.post('/upload', uploadFiles, (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files);
    res.status(200).send('Files uploaded successfully!');
});

module.exports = router;

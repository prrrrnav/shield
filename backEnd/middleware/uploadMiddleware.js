const multer = require('multer');
const path = require('path');

// Define storage engine for Multer (store files locally, can switch to cloud later)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Store in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Create unique filename
    }
});

// Set file size limit and accept image/video/audio files only
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // 10 MB max file size
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|mp4|mp3/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
            return cb(null, true);
        } else {
            cb('Error: File type not supported!');
        }
    }
});

module.exports = upload;

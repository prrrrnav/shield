const multer = require('multer');
const path = require('path');

// Define storage engine for Multer (store files locally)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Store in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique filename based on current time
    }
});

// File validation
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|mp4|mp3/;  // Accepted types (image, video, audio)
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
        return cb(null, true);  // File is valid
    } else {
        cb('Error: File type not supported!');  // Reject invalid files
    }
};

// Multer configuration
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // Max file size: 10MB
    fileFilter
});

module.exports = upload;

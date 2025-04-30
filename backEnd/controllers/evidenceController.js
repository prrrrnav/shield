// controllers/evidenceController.js
const path = require('path');

const uploadEvidence = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'Evidence uploaded successfully',
    filePath: `/uploads/evidence/${req.file.filename}`
  });
};

module.exports = { uploadEvidence };

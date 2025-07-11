const Report = require('../models/Report');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Create a new report
exports.createReport = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // decoded should contain { _id, name, ... }
        console.log(decoded)
        const victimId = decoded.id;
        const { description } = req.body;
        const evidences = {
            images: req.files['evidenceImages'] || [],
            videos: req.files['evidenceVideos'] || [],
            audios: req.files['evidenceAudios'] || []
        };
        console.log("Uploaded files:", req.files);
        console.log("Request body:", req.body);


        if (!victimId || !description || !evidences.images.length && !evidences.videos.length && !evidences.audios.length) {
            return res.status(400).json({ message: 'Victim ID, description, and at least one evidence are required.' });
        }

        // Map files to their paths (or URL if uploaded to a cloud storage)
        const evidenceFilePaths = {
            images: evidences.images.map(file => file.path),
            videos: evidences.videos.map(file => file.path),
            audios: evidences.audios.map(file => file.path)
        };

        const newReport = new Report({
            victim: victimId,
            description,
            evidences: [...evidenceFilePaths.images, ...evidenceFilePaths.videos, ...evidenceFilePaths.audios]
        });

        await newReport.save();

        res.status(201).json({ message: 'Report created successfully', report: newReport });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Failed to create report', error });
    }
};

// Get all reports (for admin to view)
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('victim');

        if (reports.length === 0) {
            return res.status(404).json({ message: 'No reports found.' });
        }

        res.status(200).json({ reports });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Failed to fetch reports', error });
    }
};

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    victim: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    evidences: [
        {
            type: String,  // File paths or cloud URLs
            required: true,
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);

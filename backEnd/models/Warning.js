const mongoose = require('mongoose');

const warningSchema = new mongoose.Schema({
    harasser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    harasserExplanation: {
        type: String,  // When he logs in to explain
    },
    explanationSubmittedAt: {
        type: Date,
    }
}, { timestamps: true });

module.exports = mongoose.model('Warning', warningSchema);

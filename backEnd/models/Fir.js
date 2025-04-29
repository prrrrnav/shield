const mongoose = require('mongoose');

const firSchema = new mongoose.Schema({
    victim: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    accused: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firDetails: {
        type: String,
        required: true,
    },
    lodgedByAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    victimConsent: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Filed', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Fir', firSchema);

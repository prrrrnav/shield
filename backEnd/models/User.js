const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['victim', 'harasser', 'admin'],  // Admins manually inserted maybe
        default: 'victim'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

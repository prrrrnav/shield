// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const smsRoutes = require('./routes/smsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');
const { connectToMongo } = require('./config/db');

// Setup environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware for CORS and JSON handling
// app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/upload', uploadRoutes);

// Protected Routes (Require authentication)
app.use('/api', authMiddleware, reportRoutes);  // Report routes (protected)

// Test protected route
app.use('/api/users', authMiddleware, (req, res) => {
    res.status(200).json({ message: "✅ Protected route accessed successfully." });
});

// Default route
app.get('/', (req, res) => {
    res.send('Nammasuraksha API is running 🚀');
});

// Connect to MongoDB and start server
async function startServer() {
    try {
        await connectToMongo();
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

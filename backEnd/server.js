// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Enable CORS for cross-origin requests

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

// Check if essential environment variables are set
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not defined in the environment variables.');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5000;

// Middleware for CORS and JSON handling
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse incoming JSON requests
app.use('/uploads', express.static('uploads'));  // Serve uploaded files

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/upload', uploadRoutes);

// Protected Routes (Require authentication)
app.use('/api', authMiddleware, reportRoutes);  // Report routes (protected)

// Test protected route (for debugging)
app.use('/api/users', authMiddleware, (req, res) => {
    res.status(200).json({ message: "✅ Protected route accessed successfully." });
});

// Default route (check server is running)
app.get('/', (req, res) => {
    res.send('Nammasuraksha API is running 🚀');
});

// Connect to MongoDB and start the server
async function startServer() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await connectToMongo();
        console.log('✅ Connected to MongoDB');
        
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1); // Exit with failure code if MongoDB connection fails
    }
}

startServer();

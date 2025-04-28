const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const mongoose = require('mongoose');
const { connectToMongo } = require('./config/db');
require('dotenv').config();  // Load environment variables

const app = express();
const port = process.env.PORT || 5000;  // Use environment variable for port if available

// Middlewares
app.use(express.json());

// Public routes (Register and Login)
app.use('/api/auth', userRoutes);  // <-- Changed from '/api' to '/api/auth'

// Protected routes (after authentication middleware)
app.use('/api/users', authMiddleware, (req, res, next) => {
    res.status(200).json({ message: "Protected route accessed successfully." });
});

// Home Route (Optional: good for testing server is working)
app.get('/', (req, res) => {
    res.send('Nammasuraksha API is running 🚀');
});

// 🛠 Correctly connect to DB and then start server
async function startServer() {
    try {
        await connectToMongo();  // ✅ Connect to DB first
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
    }
}

startServer();  // Call the function

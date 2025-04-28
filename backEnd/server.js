const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');  // Import the report routes
const dashboardRoutes = require('./routes/dashboardRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const { connectToMongo } = require('./config/db');

dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// ==================
// Middlewares
// ==================
app.use(express.json());  // Parse incoming JSON
app.use('/uploads', express.static('uploads'));  // Serve uploaded files
// Public Routes (Register and Login)
app.use('/api/auth', userRoutes);

// Protected Routes (Dashboard, etc.)
// Protected routes (Dashboard, Reports, etc.)
app.use('/api', authMiddleware, reportRoutes);  // Use authMiddleware for report routes
app.use('/api/dashboard', authMiddleware, dashboardRoutes);

// Test protected route
app.use('/api/users', authMiddleware, (req, res) => {
    res.status(200).json({ message: "✅ Protected route accessed successfully." });
});


app.get('/', (req, res) => {
    res.send('Nammasuraksha API is running 🚀');
});

async function startServer() {
    try {
        await connectToMongo();  // Ensure MongoDB connected before listening
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);  // Exit process with failure
    }
}

startServer();

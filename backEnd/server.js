const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const fileRoutes = require('./routes/uploadRoutes');  // Changed to require
const userRoutes = require('./routes/userRoutes');
const smsRoutes = require('./routes/smsRoutes');
const reportRoutes = require('./routes/reportRoutes');
const evidenceRoutes = require('./routes/evidenceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes/dashboard');

const authMiddleware = require('./middleware/authMiddleware');
const { connectToMongo } = require('./config/db');


// Check necessary environment variables
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in the environment variables.');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

// Cloudflare R2 credentials check
if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME) {
  console.error('R2 credentials or bucket name are not defined in the environment variables.');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/files", fileRoutes);  // File upload route (R2 integration)
app.use('/uploads/evidence', express.static('uploads/evidence'));  // Local static file handling (optional)

// Auth Routes
app.use('/api/auth', userRoutes);


// Dashboard Routes
app.use('/api/dashboard', dashboardRoutes);  

// SMS Routes
app.use('/api/sms', smsRoutes);

// Evidence Routes
app.use('/api/evidence', evidenceRoutes);

// Protected routes
app.use('/api', authMiddleware, reportRoutes);

// A sample protected route
app.use('/api/users', authMiddleware, (req, res) => {
  res.status(200).json({ message: "Protected route accessed successfully." });
});

// Home Route
app.get('/', (req, res) => {
  res.send('Nammasuraksha API is running');
});

// MongoDB connection and server startup
async function startServer() {
  try {
    console.log('Connecting to MongoDB...');
    await connectToMongo();
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

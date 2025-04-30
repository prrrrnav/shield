const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const smsRoutes = require('./routes/smsRoutes');
const reportRoutes = require('./routes/reportRoutes');
const evidenceRoutes = require('./routes/evidenceRoutes');

const authMiddleware = require('./middleware/authMiddleware');
const { connectToMongo } = require('./config/db');

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in the environment variables.');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads/evidence', express.static('uploads/evidence'));

app.use('/api/evidence', evidenceRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api', authMiddleware, reportRoutes);
app.use('/api/users', authMiddleware, (req, res) => {
  res.status(200).json({ message: "Protected route accessed successfully." });
});

app.get('/', (req, res) => {
  res.send('Nammasuraksha API is running');
});

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

const mongoose = require('mongoose');
require('dotenv').config();  // Add this to load the .env file

async function connectToMongo() {
    const uri = process.env.MONGODB_URI;  // Access the URI from .env file

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB (via Mongoose)');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { connectToMongo };

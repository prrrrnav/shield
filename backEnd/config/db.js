const mongoose = require('mongoose');
require('dotenv').config(); 

async function connectToMongo() {
    const uri = process.env.MONGODB_URI; 

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

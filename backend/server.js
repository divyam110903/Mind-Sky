require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    let mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.log('No MONGO_URI provided. Starting in-memory MongoDB for seamless local development...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully');
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server due to MongoDB connection error:', err);
  }
}

startServer();

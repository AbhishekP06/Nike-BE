const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 15000,  // Timeout after 15 sec if no response
        socketTimeoutMS: 15000, // Close socket after 15 sec if no response
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  module.exports = connectDB;

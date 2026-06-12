const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    // Don't expose full error details in logs
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    } else {
      console.error('Database connection failed');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
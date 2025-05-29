const mongodb = require("mongoose");

const connectDb = async () => {
  try {
    // console.log("Connecting to MongoDB...", process.env.MONGODB_URL);
    await mongodb.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
  }
};

module.exports = connectDb;

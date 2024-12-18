import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL || "mongodb://localhost:27017/webapp";
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(MONGO_URL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
  }
};
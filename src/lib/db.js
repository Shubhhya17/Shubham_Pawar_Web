// import mongoose from "mongoose";

// const MONGO_URL = process.env.MONGO_URL;

// export const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 1) return;

//     await mongoose.connect(MONGO_URL);

//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.log("DB Error:", error);
//   }
// };

import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    mongoose.set("bufferCommands", false); // ⭐ important

    const db = await mongoose.connect(MONGO_URL, {
      dbName: "portfolio",
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState;

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
    throw error; // ⭐ important (warna silent fail)
  }
};
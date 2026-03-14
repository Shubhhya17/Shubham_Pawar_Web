const express = require("express");
const mongoose = require("mongoose");

const app = express();

const MONGO_URL = "mongodb+srv://username:password@cluster.mongodb.net/myDB";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database Error:", error);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
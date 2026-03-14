import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userNumber: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
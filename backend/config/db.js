// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectdb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10s timeout
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1); // exit process if DB fails to connect
  }
};

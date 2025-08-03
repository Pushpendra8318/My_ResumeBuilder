
//config/db.js
import mongoose from "mongoose";
 import dotenv from "dotenv";

dotenv.config();
export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection failed:', err);
  }
};

import mongoose from "mongoose";
 
try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/posada-db");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
 
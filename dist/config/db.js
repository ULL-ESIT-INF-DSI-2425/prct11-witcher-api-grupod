//db.ts
import mongoose from "mongoose";
/**
 * Conección a la base de datos MongoDB
  * @returns {Promise<void>}
  * @throws {Error} Si no se puede conectar a la base de datos
  * @description Esta función se encarga de conectar a la base de datos MongoDB utilizando Mongoose.
 */
try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/posada-db");
    console.log("MongoDB connected");
}
catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
}

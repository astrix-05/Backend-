// ...existing code...
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL not set in environment");
    }

    // Use MONGO_URL as a full connection string (do not append DB name if it's already included)
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connected");
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED:", error);
    process.exit(1); // exit with failure
  }
};

export default connectDB;
// ...existing code...
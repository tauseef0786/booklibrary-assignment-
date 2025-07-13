import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnecDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect MongoDB:", error.message);
    process.exit(1); // Stop the app if DB fails
  }
};

export default ConnecDb;

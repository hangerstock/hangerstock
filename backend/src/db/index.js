import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hangerstock",
    });

    console.log("MongoDB connected.");
  } catch (error) {
    throw new Error(error);
  }
};

export default dbConnect;

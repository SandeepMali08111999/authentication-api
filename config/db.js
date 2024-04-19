import mongoose from "mongoose";
import { config } from "dotenv";
config();
const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};

export default connectDB;

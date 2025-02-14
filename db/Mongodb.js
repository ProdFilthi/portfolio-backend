import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongodb_URI = process.env.MONGODB_URI;

const mongodbConnect = async () => {
  try {
    if (!mongodb_URI) {
      console.log(
        "The connection string is not available in the env variables"
      );
    }
    await mongoose.connect(mongodb_URI);
    console.log("The database is connected successfully...");
  } catch (err) {
    throw new Error("Error connecting to database... ", err.message);
    process.exit(1);
  }
};
export default mongodbConnect;

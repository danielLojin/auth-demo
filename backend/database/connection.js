import mongoose from "mongoose";

const connectDB = async function (DB) {
  try {
    const connection = await mongoose.connect(DB);

    console.log(`Successfully connected to the MongoDB database`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

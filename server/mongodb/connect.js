import mongoose from "mongoose";

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {});
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectDB;

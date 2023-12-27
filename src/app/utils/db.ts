import mongoose from "mongoose";

const connect = async () => {
    try {
        // if (!process.env.MONGO) {
        //     throw new Error("MongoDB connection string is not defined.");
        // }

        await mongoose.connect("mongodb://0.0.0.0:27017/sellcode");

        console.log("Connected to MongoDB");
    } catch (error) {
        // console.error("Connection to MongoDB failed:", error.message);
        throw new Error("Connection to MongoDB failed.");
    }
};

export default connect;

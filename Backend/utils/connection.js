import mongoose from "mongoose";

const dbConnection = async () => {

    try {
        
        const uri = process.env.MONGODB_URL?.trim();
        if (!uri) {
            throw new Error("MONGODB_URL is not set in .env");
        }
        await mongoose.connect(uri)

        console.log("DB connected")
    } catch (error) {
        console.log("DB Error:"+ error);
    }
};

export default dbConnection
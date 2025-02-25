import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
import { Book } from "@/models/book";
import { User } from "@/models/user";
import mongoose from "mongoose";

export default async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		mongoose.connection.on("connected", () =>
			console.log("Connected to MongoDB")
		);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
}

export async function getUniqueUser(key, value) {
	await connectDB();
	return await User.findOne({ [key]: value }).lean();
}

export async function getUniqueBook(key, value) {
	await connectDB();
	return await Book.findOne({ [key]: value }).lean();
}
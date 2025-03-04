import connectDB from "@/lib/db";
import { Book } from "@/models/book";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { bookId, categories } = await req.json();

		if (!bookId || !Array.isArray(categories)) {
			return NextResponse.json(
				{ error: "Invalid data" },
				{ status: 400 }
			);
		}

		await connectDB();
		await Book.findByIdAndUpdate(bookId, { categories });

		return NextResponse.json(
			{ error: "Book categories updated successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating book categories:", error);
		return NextResponse.json(
			{ error: "Failed to update book categories" },
			{ status: 500 }
		);
	}
}

"use server";

import { User } from "@/models/user";
import connectDB from "./db";
import { revalidatePath } from "next/cache";

export async function AddExistingBook(book, user) {
	await connectDB();
	const userData = await User.findOne({ username: user.username });
	userData.saved_books.push({ bookId: book._id.toString(), read: false });
	await userData.save();
	revalidatePath(`/books/${book.ISBN}`);
}

export async function removeBook(book, user) {
	await connectDB();
	const userData = await User.findOne({ username: user.username });
	userData.saved_books = userData.saved_books.filter(
		savedBook => savedBook.bookId !== book._id.toString()
	);
	await userData.save();
	revalidatePath(`/books/${book.ISBN}`);
}

export async function fetchIsbnTen(ISBN) {
	const res = await fetch(`https://openlibrary.org/isbn/${ISBN}.json`);
	if (res.status !== 200) return null;
	const data = await res.json();
	if (!data.isbn_10) return null;
	return data.isbn_10[0];
}

export async function fetchAmazon(ISBN) {
	const [resUS, resUK] = await Promise.all([
		fetch(`https://amazon.com/dp/${ISBN}`),
		fetch(`https://amazon.co.uk/dp/${ISBN}`)
	]);
	if (resUS.status !== 200 && resUK !== 200) return { success: false };
	if (resUK.status === 200)
		return {
			success: true,
			url: `https://amazon.co.uk/dp/${ISBN}/ref=nosim?tag=${process.env.AMAZON_TRACKING_ID}`
		};
	if (resUS.status === 200)
		return {
			success: true,
			url: `https://amazon.com/dp/${ISBN}/ref=nosim?tag=${process.env.AMAZON_TRACKING_ID}`
		};
}

export async function fetchWaterstones(ISBN) {
	const res = await fetch(`https://waterstones.com/book/${ISBN}`, {
		method: "HEAD"
	});
	if (res.status === 200) return true;
	return false;
}

export async function fetchWorks(key) {
	const res = await fetch(`https://openlibrary.org${key}.json`);
	if (res.status === 200) return res.json();
	return {};
}

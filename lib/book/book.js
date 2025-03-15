"use server";

import { getUniqueBook, getUniqueUser } from "../db";
import { revalidatePath } from "next/cache";

export async function AddExistingBook(book, user) {
	const userData = await getUniqueUser("username", user.username);
	userData.saved_books.push({ bookId: book._id.toString(), read: false });
	await userData.save();
	revalidatePath(`/books/${book.ISBN}`);
}

export async function removeBook(book, user) {
	const userData = await getUniqueUser("username", user.username);
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

export async function fetchWorks(key) {
	const res = await fetch(`https://openlibrary.org${key}.json`);
	if (res.status === 200) return res.json();
	return {};
}

export async function HandleISBN(ISBN) {
	const existingBook = await getUniqueBook("ISBN", ISBN);
	if (existingBook)
		return {
			isbnExists: true,
			bookData: JSON.parse(JSON.stringify(existingBook)),
			isbnTen: false
		};

	const res = await fetch(`https://openlibrary.org/isbn/${ISBN}.json`);
	if (res.status !== 200) return { isbnExists: false, bookData: null };

	const bookData = await res.json();
	return {
		isbnExists: false,
		bookData,
		isbnTen: bookData.isbn_10?.includes(ISBN.toUpperCase())
	};
}

export async function fetchAuthorFromKey(key) {
	const res = await fetch(`https://openlibrary.org/${key}.json`);
	if (res.status !== 200) return;
	return await res.json();
}

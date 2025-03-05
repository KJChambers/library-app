"use server";

import connectDB from "@/lib/db";
import { Book } from "@/models/book";
import { User } from "@/models/user";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function SearchRedirect() {
	redirect("/books");
}

export async function AddBookRedirect() {
	redirect("/new-book");
}

export async function HandleISBN(ISBN) {
	await connectDB();
	const existingBook = await Book.findOne({ ISBN }).lean();
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

export async function AddBook(prevState, formData) {
	const title = formData.get("title")?.trim(); // required
	const authors = formData.get("authors")?.trim() || "Unknown";
	const desc = formData.get("desc")?.trim(); // required
	const ISBN = formData.get("isbn")?.trim(); // required
	const pages = parseInt(formData.get("pages"), 10) || null; // number
	const categories = formData.get("categories")?.trim() || [];
	const publisher = formData.get("publisher")?.trim() || "Unknown";
	const pubDate = formData.get("pubDate")
		? formData.get("pubDate").substring(0, 10)
		: "Unknown";
	const username = formData.get("username");
	const works = formData.get("works");

	const errors = new Set();

	const titleDescRegex = /^[^<>={}]+$/;
	const nameRegex = /^[\p{L}\p{N}\s,.&-'`]+$/u;

	if (!ISBN) errors.add("ISBN is required.");

	if (ISBN) {
		const cleanedISBN = ISBN.replace(/-/g, "");

		if (!/^\d+$/.test(cleanedISBN))
			errors.add("ISBN must only contain numbers.");
		if (cleanedISBN.length !== 13) errors.add("ISBN must be 13 digits");
	}

	if (!title || !desc) errors.add("Title and description required.");
	if (!titleDescRegex.test(title))
		errors.add("Title contains invalid characters");
	if (desc.length < 25)
		errors.add("Description must be at least 25 characters.");
	if (!titleDescRegex.test(desc))
		errors.add("Description contains invalid characters");
	if (pages && pages < 1)
		errors.add("Pages cannot be 0 - leave blank if unsure.");
	if (!nameRegex.test(authors))
		errors.add("Author(s) contains invalid characters..");
	if (!nameRegex.test(publisher))
		errors.add("Publisher contains invalid characters.");

	if (errors.size > 0)
		return { errors: Array.from(errors), payload: formData };

	await connectDB();
	const cleanedISBN = ISBN.replace(/-/g, "");
	const existingBook = await Book.findOne({ ISBN: cleanedISBN });
	if (existingBook) {
		errors.add("ISBN already exists");
		return { errors: Array.from(errors), payload: formData };
	}

	let parsedCategories;
	try {
		parsedCategories = JSON.parse(categories);
		if (!Array.isArray(parsedCategories)) parsedCategories = [];
	} catch (error) {
		parsedCategories = [];
	}

	try {
		const [book, user] = await Promise.all([
			Book.create({
				title,
				authors,
				desc,
				categories: parsedCategories,
				publisher,
				pub_date: pubDate,
				ISBN: cleanedISBN,
				works: [{ key: works }],
				...(pages && { pages })
			}),
			User.findOne({ username })
		]);

		if (user) {
			user.saved_books.push({ bookId: book._id.toString(), read: false });
			await user.save();
		}

		redirect(`/profile/${username}`);
	} catch (error) {
		if (isRedirectError(error)) throw error;

		errors.add(error.message);
		return { errors: Array.from(errors), payload: formData };
	}
}

export async function editBook(prevState, formData) {
	const ISBN = formData.get("isbn").trim();
	const title = formData.get("title").trim();
	const desc = formData.get("desc").trim();
	const authors = formData.get("authors").trim() || "Unknown";
	const pages = parseInt(formData.get("pages"), 10) || null;
	const publisher = formData.get("publisher")?.trim() || "Unknown";
	const pubDate = formData.get("pubDate")
		? formData.get("pubDate").substring(0, 10)
		: "Unknown";
	const oldISBN = formData.get("oldISBN");

	const errors = new Set();

	const titleDescRegex = /^[^<>={}]+$/;
	const nameRegex = /^[\p{L}\p{N}\s,.&-'`]+$/u;

	if (!ISBN) errors.add("ISBN is required.");
	else {
		const cleanedISBN = ISBN.replace(/-/g, "");
		if (!/^\d+$/.test(cleanedISBN) || cleanedISBN.length !== 13)
			errors.add("ISBN must be a 13 digit number.");
	}

	if (!title || !titleDescRegex.test(title))
		errors.add("Title must be present and not contain invalid characters");
	if (!desc || desc.length < 25 || !titleDescRegex.test(desc))
		errors.add(
			"Description must be at least 25 characters and not contain invalid letters"
		);
	if (pages && pages < 1)
		errors.add("Pages cannot be 0. Leave blank if unsure.");
	if (!nameRegex.test(authors))
		errors.add("Author(s) has invalid characters.");
	if (!nameRegex.test(publisher))
		errors.add("Publisher has invalid characters.");

	if (errors.size > 0) return { errors: Array.from(errors) };

	await connectDB();
	const cleanedISBN = ISBN.replace(/-/g, "");
	const [existingBook, oldBookData] = await Promise.all([
		Book.findOne({ ISBN: cleanedISBN }),
		Book.findOne({ ISBN: oldISBN })
	]);

	if (existingBook && oldISBN !== cleanedISBN)
		return { errors: ["ISBN already exists"] };

	if (oldBookData) {
		const updatedFields = {};
		const fields = {
			title,
			desc,
			authors,
			pages,
			publisher,
			pub_date: pubDate,
			ISBN: cleanedISBN
		};

		Object.entries(fields).forEach(([key, value]) => {
			if (oldBookData[key] !== value) updatedFields[key] = value;
		});

		if (Object.keys(updatedFields).length === 0) {
			return { errors: [] };
		}

		try {
			await Book.updateOne({ ISBN: oldISBN }, { $set: updatedFields });
			revalidatePath("/books");
			return { success: true };
		} catch (error) {
			return { errors: [error.message] };
		}
	}

	return { errors: ["Book not found."] };
}

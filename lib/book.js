'use server';

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
    const data = await res.json();
    if (!data.isbn_10) return null;
    return data.isbn_10[0];
}
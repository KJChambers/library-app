'use server';

import connectDB from "@/lib/db";
import { Book } from "@/models/book";

export default async function searchBooks(query, filters, amount) {
    await connectDB();

    const bookSet = new Set();
    let books = [];

    let searchQuery = {};
    if (filters.category) searchQuery.categories = filters.category;

    if (!query.trim()) {
        books = await Book.find(searchQuery).limit(amount);
        return JSON.stringify(books);
    }

    const searchConditions = [
        { title: query },
        { desc: query },
        { authors: query },
        { title: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
        { authors: { $regex: query, $options: "i" } }
    ];
    
    for (const condition of searchConditions) {
        if (books.length >= amount) break;

        const queryFilter = { ...condition, ...searchQuery };

        const remaining = amount - books.length;
        const newBooks = await Book.find(queryFilter).limit(remaining);

        for (const book of newBooks) {
            if (!bookSet.has(book._id.toString())) {
                bookSet.add(book._id.toString());
                books.push(book);
                if (books.length === amount) break;
            }
        }
    }

    return JSON.stringify(books);
}
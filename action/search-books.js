'use server';

import connectDB from "@/lib/db";
import { Book } from "@/models/book";

export default async function searchBooks(query, filters, amount = null) {
    await connectDB();

    const bookSet = new Set();
    let books = [];

    let searchQuery = {};
    if (filters.category) searchQuery.categories = filters.category;

    if (!query.trim()) {
        let query = Book.find(searchQuery);
        if (amount) {
            query = query.limit(amount);
        }
        const books = await query;
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
        const queryFilter = { ...condition, ...searchQuery };
        let newBookQuery = Book.find(queryFilter);

        if (amount) {
            if (books.length >= amount) break;
            const remaining = amount - books.length;
            newBookQuery.limit(remaining);
        }

        const newBooks = await newBookQuery;

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
'use client';

import searchBooks from "@/action/search-books";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/books/search?query=${query.replace(' ', '-')}`);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);

        if (e.target.value.trim() === "") {
            setResults([]);
            return;
        }

        startTransition(async () => {
            const books = await searchBooks(e.target.value, {}, 4);
            setResults(JSON.parse(books));
        })
    }

    return (
        <div className="relative max-w-md mx-auto mt-4">
            <form onSubmit={handleSearch} className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for a book..."
                    className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button type="submit" className="px-4 cursor-pointer bg-violet-500 hover:bg-violet-700 text-white rounded-r-md">
                    🔍
                </button>
            </form>

            {query &&
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1">
                    {isPending ? (
                        <p className="p-2 text-gray-500">Loading...</p>
                    ) : results.length > 0 ? (
                        results.map((book) => (
                            <div
                                key={book._id}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => router.push(`/books/${book.ISBN}`)}
                            >
                                <p className="font-semibold">{book.title}</p>
                                <p className="text-sm text-gray-600">{book.authors}</p>
                            </div>
                        ))
                    ) : (
                        <p className="p-2 text-gray-500">No results found</p>
                    )}
                </div>
            }
        </div>
    );
}
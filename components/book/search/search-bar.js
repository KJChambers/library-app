'use client';

import searchBooks from "@/action/search-books";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchBar({ initialQuery = "", category = null, inputClasses = "" }) {
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/books/search?query=${query.replace(' ', '-')}${category ? `&category=${category}` : ``}`);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);

        if (e.target.value.trim() === "") {
            setResults([]);
            setOpen(false);
            return;
        }

        startTransition(async () => {
            const books = await searchBooks(e.target.value, {}, 4);
            setResults(JSON.parse(books));
            setOpen(true);
        })
    }

    return (
        <div className="relative max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onBlur={() => setTimeout(() => setOpen(false), 200)}
                    placeholder="Search for a book..."
                    className={`w-full p-2 border border-gray-300 rounded-l-md focus:outline-none ${inputClasses}`}
                />
                <button type="submit" className="px-4 cursor-pointer bg-violet-500 hover:bg-violet-700 text-white rounded-r-md">
                    🔍
                </button>
            </form>

            {open &&
                <div
                    className="absolute z-10 w-full bg-white dark:bg-slate-600 border border-gray-200 rounded-md shadow-md mt-1"
                    onPointerDown={(e) => e.preventDefault()}
                >
                    {isPending ? (
                        <p className="p-2 text-gray-500">Loading...</p>
                    ) : results.length > 0 ? (
                        results.map((book) => (
                            <div
                                key={book._id}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                                onClick={() => router.push(`/books/${book.ISBN}`)}
                            >
                                <p className="font-semibold">{book.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300/80">{book.authors}</p>
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
'use client';

import Image from "next/image";
import { useState } from "react";

export default function BookList({ books, className }) {
    if (books.length === 0) return <p className="col-span-full text-center text-violet-950 dark:text-violet-100">No books to show!</p>;

    const [visibleCount, setVisibleCount] = useState(8);

    const showMoreBooks = () => {
        setVisibleCount((prev) => prev + 4);
    }

    return (
        <div className={`mt-10 ${className} text-center md:text-left text-violet-950 dark:text-violet-100`}>
            {books.slice(0, visibleCount).map((book) => (
                    <div key={book._id} className="p-4 bg-white dark:bg-slate-600 border border-gray-300 dark:border-slate-300/60 rounded-md shadow-sm">
                        <div className="relative mx-auto w-44 aspect-5/8 md:w-full h-auto overflow-hidden">
                            <Image
                                src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-M.jpg`}
                                alt={`Upload a cover at https://openlibrary.org/isbn/${book.ISBN}`}
                                fill
                                sizes="100%"
                                className="rounded-md object-cover"
                            />
                        </div>
                        <h1 className="mt-2 text-base/5 font-bold">{book.title}</h1>
                        <p className="mt-2 text-sm">{book.authors}</p>
                    </div>
                ))}

                {visibleCount < books.length && (
                    <div className="col-span-full flex justify-center mt-4">
                        <button
                            onClick={showMoreBooks}
                            className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                        >
                            Show More
                        </button>
                    </div>
                )}
        </div>
    );
}
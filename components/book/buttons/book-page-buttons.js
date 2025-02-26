'use client';

import { AddExistingBook, removeBook } from "@/lib/book";
import Link from "next/link";
import { useState } from "react";

export function RemoveBookButton({ book, user }) {
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        await removeBook(book, user);
    }

    return (
        <>
            <button 
                className="py-3 w-full bg-red-500 hover:bg-red-700 disabled:bg-red-100 disabled:cursor-progress cursor-pointer text-white mx-auto justify-center rounded-md"
                onClick={() => handleSubmit()}
                disabled={isLoading}
            >
                {isLoading ? (
                    <span>Removing...</span>
                ) : (
                    <span>Remove from Book Chamber</span>
                )}
            </button>
        </>
    )
}

export function AddExistingBookButton({ book, user }) {
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        await AddExistingBook(book, user);
    }

    return (
        <button
            className="py-3 w-full bg-green-500 hover:bg-green-700 cursor-pointer text-white mx-auto justify-center rounded-md disabled:bg-green-100 disabled:text-gray-500 disabled:cursor-progress"
            onClick={() => handleSubmit()}
            disabled={isLoading}
        >
            {isLoading ? (
                <span>Adding book...</span>
            ) : (
                <span>Add to Book Chamber</span>
            )}
        </button>
    );
}

export function NoUserButton() {
    return (
        <span className="inline-block text-center w-44 md:w-full">
            <Link href="/login" className="text-violet-500 hover:text-violet-700">
                Log in
            </Link>{" "}
            to access advanced features
        </span>
    )
}
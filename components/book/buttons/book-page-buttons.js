"use client";

import { AddExistingBook, removeBook } from "@/lib/book/book";
import Link from "next/link";
import { useState } from "react";

export function RemoveBookButton({ book, user }) {
	const [isLoading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		await removeBook(book, user);
	};

	return (
		<button
			className="mx-auto w-full cursor-pointer justify-center rounded-md bg-red-500 py-3 text-white hover:bg-red-700 disabled:cursor-progress disabled:bg-red-100"
			onClick={() => handleSubmit()}
			disabled={isLoading}
		>
			{isLoading ? (
				<span>Removing...</span>
			) : (
				<span>Remove from Book Chamber</span>
			)}
		</button>
	);
}

export function AddExistingBookButton({ book, user }) {
	const [isLoading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		await AddExistingBook(book, user);
	};

	return (
		<button
			className="mx-auto w-full cursor-pointer justify-center rounded-md bg-green-500 py-3 text-white hover:bg-green-700 disabled:cursor-progress disabled:bg-green-100 disabled:text-gray-500"
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
		<span className="inline-block w-44 text-center md:w-full">
			<Link
				href="/login"
				className="text-violet-500 hover:text-violet-700"
			>
				Log in
			</Link>{" "}
			to access advanced features
		</span>
	);
}

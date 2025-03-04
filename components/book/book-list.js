"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CoverImage from "./cover-image";

export default function BookList({
	books,
	className,
	publisher = false,
	date = false,
	scrollable = false
}) {
	if (books.length === 0)
		return (
			<p className="col-span-full text-center text-violet-950 dark:text-violet-100">
				No books to show!
			</p>
		);

	const router = useRouter();
	const [visibleCount, setVisibleCount] = useState(8);

	const showMoreBooks = () => {
		setVisibleCount(prev => prev + 4);
	};

	useEffect(() => {
		if (!scrollable) return;

		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight - 50
			)
				showMoreBooks();
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [scrollable]);

	return (
		<div
			className={`mt-10 ${className} text-center text-violet-950 md:text-left dark:text-violet-100`}
		>
			{books.slice(0, visibleCount).map(book => (
				<div
					key={book._id}
					className="cursor-pointer rounded-md border border-gray-300 bg-white p-4 shadow-sm hover:bg-gray-100 dark:border-slate-300/60 dark:bg-slate-600 dark:hover:bg-slate-700"
					onClick={() => router.push(`/books/${book.ISBN}`)}
				>
					<div className="relative mx-auto aspect-5/8 h-auto w-44 overflow-hidden md:w-full">
						<CoverImage book={JSON.parse(JSON.stringify(book))} />
					</div>
					<h1 className="mt-2 text-base/5 font-bold">{book.title}</h1>
					<p className="mt-2 text-sm">{book.authors}</p>
					{(publisher || date) && (
						<p className="mt-2 text-sm">
							{date ? book.pub_date : ""}
							{publisher ? ", " + book.publisher : ""}
						</p>
					)}
				</div>
			))}

			{!scrollable && visibleCount < books.length && (
				<div className="col-span-full mt-4 flex justify-center">
					<button
						onClick={showMoreBooks}
						className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none"
					>
						Show More
					</button>
				</div>
			)}
		</div>
	);
}

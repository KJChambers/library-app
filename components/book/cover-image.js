"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export default function CoverImage({ book }) {
	const [isBlankCover, setBlankCover] = useState(null);

	const handleImageError = useCallback(() => {
		setBlankCover(true);
	}, []);

	const memoizedBook = useMemo(() => book, [book]);

	return !isBlankCover ? (
		<Image
			src={`https://covers.openlibrary.org/b/isbn/${memoizedBook.ISBN}-M.jpg?default=false`}
			alt={memoizedBook.title}
			fill
			sizes="100%"
			className="rounded-md object-cover"
			priority
			onError={handleImageError}
		/>
	) : (
		<div className="aspect-5/8 rounded-md bg-gray-200 object-cover p-3 text-center">
			<span className="space-y-5 align-middle">
				<p className="font-semibold">{memoizedBook.title}</p>
				<p>{memoizedBook.authors}</p>
				<p className="text-sm/6">
					This book is missing a cover - add one at
					https://openlibrary.org/isbn/{memoizedBook.ISBN}
				</p>
			</span>
		</div>
	);
}

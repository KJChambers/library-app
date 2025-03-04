"use client";

import Image from "next/image";
import { useState } from "react";

export default function CoverImage({ book }) {
	const [isBlankCover, setBlankCover] = useState(null);

	return !isBlankCover ? (
		<Image
			src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-M.jpg?default=false`}
			alt={book.title}
			fill
			sizes="100%"
			className="rounded-md object-cover"
			priority
			onError={() => setBlankCover(true)}
		/>
	) : (
		<div className="aspect-5/8 rounded-md bg-gray-200 object-cover p-3 text-center">
			<span className="space-y-5 align-middle">
				<p className="font-semibold">{book.title}</p>
				<p>{book.authors}</p>
				<p className="text-sm/6">
					This book is missing a cover - add one at
					https://openlibrary.org/isbn/{book.ISBN}
				</p>
			</span>
		</div>
	);
}

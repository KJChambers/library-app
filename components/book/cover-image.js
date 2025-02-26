'use client';

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
            <div className="bg-gray-200 aspect-5/8 p-3 text-center rounded-md object-cover">
                <span className="align-middle space-y-5">
                    <p className="font-semibold">{book.title}</p>
                    <p>{book.authors}</p>
                    <p className="text-sm/6">This book is missing a cover - add one at https://openlibrary.org/isbn/{book.ISBN}</p>
                </span>
            </div>
        )
}
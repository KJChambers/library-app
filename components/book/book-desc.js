'use client';

import { useState } from "react";

export default function BookDesc({ desc }) {
    const [isExpanded, setExpanded] = useState(false);
    const truncatedText = desc.length > 250 ? desc.slice(0, 250) + "..." : desc;

    return (
        <p className="whitespace-pre-line">
            {isExpanded ? desc : truncatedText}
            {desc.length > 150 && (
                <button
                    onClick={() => setExpanded(!isExpanded)}
                    className="text-violet-500 hover:text-violet-700 ml-2 cursor-pointer"
                >
                    {isExpanded ? "Read Less" : "Read More"}
                </button>
            )}
        </p>
    );
}
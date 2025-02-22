'use client';

import { fiction, nonFiction } from "@/lib/categories";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

export default function CategoryFilter({ query, currentCategory }) {
    const router = useRouter();
    const [expanded, setExpanded] = useState({ fiction: false, nonFiction: false });

    const toggleExpand = (type) => {
        setExpanded((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const updateCategory = (category) => {
        router.push(`/books/search?${query ? `query=${query.trim().replaceAll(' ', '-')}&` : ""}category=${category.replaceAll(' ', '-').replace('&', '%26')}`);
    };

    const handleRemove = (category) => {
        router.push(`/books/search?${query ? `query=${query.trim().replaceAll(' ', '-')}` : ""}`);
    };

    return (
        <>
            <h1 className="text-center font-bold text-2xl/10">Filters</h1>
            <p className="font-semibold text-lg">Category:</p>
            {!currentCategory ? (
                <ul className="ms-4 mt-3 space-y-3">
                    <li>
                        <button className="flex items-center gap-2 cursor-pointer" onClick={() => toggleExpand("fiction")}>
                            Fiction {expanded.fiction ? <FaAngleDown /> : <FaAngleRight />}
                        </button>
                        {expanded.fiction && (
                            <ul className="ms-4 mt-2">
                                {fiction.sort().map((cat) => (
                                    <li key={cat}>
                                        <button onClick={() => updateCategory(cat)} className={currentCategory === cat ? "font-bold cursor-pointer" : "cursor-pointer"}>{cat}</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                    <li>
                        <button className="flex items-center gap-2 cursor-pointer" onClick={() => toggleExpand("nonFiction")}>
                            Non-Fiction {expanded.nonFiction ? <FaAngleDown /> : <FaAngleRight />}
                        </button>
                        {expanded.nonFiction && (
                            <ul className="ms-4 mt-2">
                                {nonFiction.sort().map((cat) => (
                                    <li key={cat}>
                                        <button onClick={() => updateCategory(cat)} className={currentCategory === cat ? "font-bold cursor-pointer" : "cursor-pointer"}>{cat}</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul> 
            ) : (
                <span
                    className="ms-4 mt-3 inline-flex items-center gap-2 text-base px-2 py-1 sm:text-sm/6 font-medium bg-violet-600 text-white rounded-md"
                >
                    {currentCategory}
                    <button
                            type="button"
                            onClick={() => handleRemove(currentCategory)}
                            className="text-white hover:text-gray-300"
                        >
                            ✕
                    </button>
                </span>
            )}
        </>
    );
}
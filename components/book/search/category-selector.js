'use client';

import { fiction, nonFiction } from "@/lib/categories";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategorySelector() {
    const [selectedType, setSelectedType] = useState(null);
    const router = useRouter();

    const categories = selectedType === "fiction" ? fiction: nonFiction;

    return (
        <div className="text-center mt-4">
            {!selectedType ? (
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setSelectedType("fiction")}
                        className="px-4 py-2 cursor-pointer bg-violet-600 text-white rounded-md hover:bg-violet-700"
                    >
                        Fiction
                    </button>
                    <button
                        onClick={() => setSelectedType("non-fiction")}
                        className="px-4 py-2 cursor-pointer bg-violet-600 text-white rounded-md hover:bg-violet-700"
                    >
                        Non-Fiction
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setSelectedType(null)}
                        className="mb-4 px-3 cursor-pointer py-1.5 bg-violet-700 text-white rounded-md hover:bg-violet-950"
                    >
                        ⬅ Back
                    </button>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {categories.sort().map((category) => (
                            <button
                                key={category}
                                onClick={() => router.push(`/books/search?category=${category.replace(' ', '-')}`)}
                                className="p-2 cursor-pointer bg-violet-500 text-white rounded-md hover:bg-violet-700"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
"use client";

import { fiction, nonFiction } from "@/lib/book/categories";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategorySelector() {
	const [selectedType, setSelectedType] = useState(null);
	const router = useRouter();

	const categories = selectedType === "fiction" ? fiction : nonFiction;

	return (
		<div className="mt-4 text-center">
			{!selectedType ? (
				<div className="flex justify-center gap-4">
					<button
						onClick={() => setSelectedType("fiction")}
						className="cursor-pointer rounded-md bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
					>
						Fiction
					</button>
					<button
						onClick={() => setSelectedType("non-fiction")}
						className="cursor-pointer rounded-md bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
					>
						Non-Fiction
					</button>
				</div>
			) : (
				<div>
					<button
						onClick={() => setSelectedType(null)}
						className="mb-4 cursor-pointer rounded-md bg-violet-700 px-3 py-1.5 text-white hover:bg-violet-950"
					>
						⬅ Back
					</button>

					<div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
						{categories.sort().map(category => (
							<button
								key={category}
								onClick={() =>
									router.push(
										`/books/search?category=${category.replaceAll(" ", "-").replace("&", "%26")}`
									)
								}
								className="cursor-pointer rounded-md bg-violet-500 p-2 text-white hover:bg-violet-700"
							>
								{category}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

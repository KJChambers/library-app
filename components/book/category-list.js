"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { fiction, nonFiction } from "@/lib/categories";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CategoryList({ book, user }) {
	const [open, setOpen] = useState(false);
	const [categoryType, setCategoryType] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const updateCategories = async newCategories => {
		setLoading(true);
		try {
			await fetch("/api/updateBook", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					bookId: book._id,
					categories: newCategories
				})
			});
			router.refresh();
		} catch (error) {
			console.error("Failed to update categories:", error);
			setLoading(false);
		} finally {
			setTimeout(() => setLoading(false), 1500);
		}
	};

	const handleAddCategory = async category => {
		const updatedCategories = [...book.categories, category];
		await updateCategories(updatedCategories);
		setOpen(false);
	};

	const handleRemoveCategory = async category => {
		const updatedCategories = book.categories.filter(
			cat => cat !== category
		);
		await updateCategories(updatedCategories);
	};

	return (
		<div>
			<p className="mb-2 text-lg/10 font-bold">Categories:</p>
			{loading ? (
				<p className="text-gray-500">Loading...</p>
			) : (
				<ul className="flex flex-wrap items-center gap-4">
					{book.categories.sort().map(cat => (
						<li
							key={cat}
							className="flex items-center rounded-md bg-violet-500 px-3 py-2 text-violet-100"
						>
							{cat}
							{user && (
								<button
									onClick={() => handleRemoveCategory(cat)}
									className="ml-2 cursor-pointer text-white hover:text-red-400"
								>
									✕
								</button>
							)}
						</li>
					))}
					{user && (
						<button
							onClick={() => setOpen(true)}
							className="ml-2 cursor-pointer text-violet-500 hover:text-violet-700"
						>
							<FaPlus className="h-5 w-5" />
						</button>
					)}
				</ul>
			)}

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				className="relative z-50"
			>
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
						{!categoryType ? (
							<div className="flex flex-col gap-4">
								<button
									onClick={() => setCategoryType("fiction")}
									className="rounded-md bg-violet-500 px-4 py-2 text-white hover:bg-violet-700"
								>
									Fiction
								</button>
								<button
									onClick={() =>
										setCategoryType("non-fiction")
									}
									className="rounded-md bg-violet-500 px-4 py-2 text-white hover:bg-violet-700"
								>
									Non-Fiction
								</button>
							</div>
						) : (
							<ul className="flex flex-col gap-2">
								{(categoryType === "fiction"
									? fiction
									: nonFiction
								)
									.filter(
										cat => !book.categories.includes(cat)
									)
									.sort()
									.map(cat => (
										<li key={cat}>
											<button
												onClick={() =>
													handleAddCategory(cat)
												}
												className="w-full rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
											>
												{cat}
											</button>
										</li>
									))}
							</ul>
						)}
						<button
							onClick={() => {
								setOpen(false);
								setCategoryType(null);
							}}
							className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
						>
							Close
						</button>
					</DialogPanel>
				</div>
			</Dialog>
		</div>
	);
}

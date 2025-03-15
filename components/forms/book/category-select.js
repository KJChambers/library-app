"use client";

import categories from "@/lib/book/categories";
import { useState } from "react";

export default function CategorySelect() {
	const [selected, setSelected] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const filteredCategories = categories.filter(
		cat =>
			cat.toLowerCase().includes(inputValue.toLowerCase()) &&
			!selected.includes(cat)
	);

	const handleSelect = category => {
		setSelected([...selected, category]);
		setInputValue("");
	};

	const handleRemove = category => {
		setSelected(selected.filter(item => item !== category));
	};

	return (
		<div className="relative">
			<label className="block text-sm font-medium text-violet-950 dark:text-violet-100">
				Categories
			</label>
			<div className="mt-2 flex flex-wrap gap-2 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 dark:bg-slate-500">
				{selected.map(category => (
					<span
						key={category}
						className="flex items-center gap-1 rounded-md bg-violet-600 px-2 py-1 text-base font-medium text-white sm:text-sm/6"
					>
						{category}
						<button
							type="button"
							onClick={() => handleRemove(category)}
							className="text-white hover:text-gray-300"
						>
							✕
						</button>
					</span>
				))}
				<input
					type="text"
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					placeholder="Begin typing a category"
					className="flex-grow bg-transparent text-violet-950 outline-none placeholder:text-gray-400 dark:text-violet-100 dark:placeholder:text-violet-100/50"
				/>
			</div>

			{inputValue && filteredCategories.length > 0 && (
				<ul className="z-10 mt-1 block w-full rounded-md bg-white shadow-md outline-1 -outline-offset-1 outline-gray-300 dark:bg-slate-700">
					{filteredCategories.map(category => (
						<li
							key={category}
							onClick={() => handleSelect(category)}
							className="cursor-pointer rounded-md px-3 py-2 text-base hover:bg-violet-500 hover:text-white sm:text-sm/6"
						>
							{category}
						</li>
					))}
				</ul>
			)}

			<input
				type="hidden"
				name="categories"
				value={JSON.stringify(selected)}
			/>
		</div>
	);
}

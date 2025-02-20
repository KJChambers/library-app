'use client';

import categories from "@/lib/categories";
import { useState } from "react";

export default function CategorySelect() {
    const [selected, setSelected] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const filteredCategories = categories.filter(
        (cat) => cat.toLowerCase().includes(inputValue.toLowerCase()) && !selected.includes(cat)
    );

    const handleSelect = (category) => {
        setSelected([...selected, category]);
        setInputValue("");
    };

    const handleRemove = (category) => {
        setSelected(selected.filter((item) => item !== category));
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-violet-950 dark:text-violet-100">
                Categories
            </label>
            <div className="mt-2 flex flex-wrap gap-2 rounded-md bg-white dark:bg-slate-500 px-3 text-base sm:text-sm/6 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 py-1.5">
                {selected.map((category) => (
                    <span 
                        key={category}
                        className="flex items-center gap-1 text-base px-2 py-1 sm:text-sm/6 font-medium bg-violet-600 text-white rounded-md"
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
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Begin typing a category"
                    className="flex-grow outline-none bg-transparent placeholder:text-gray-400 dark:placeholder:text-violet-100/50 text-violet-950 dark:text-violet-100 "
                />
            </div>

            {inputValue && filteredCategories.length > 0 && (
                <ul className="block z-10 mt-1 w-full bg-white dark:bg-slate-700 outline-1 -outline-offset-1 outline-gray-300 rounded-md shadow-md">
                    {filteredCategories.map((category) => (
                        <li
                            key={category}
                            onClick={() =>  handleSelect(category)}
                            className="px-3 py-2 cursor-pointer rounded-md hover:bg-violet-500 hover:text-white text-base sm:text-sm/6"
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            )}

            <input type="hidden" name="categories" value={JSON.stringify(selected)} />
        </div>
    );
}
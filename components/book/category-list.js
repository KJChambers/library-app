'use client';

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

    const updateCategories = async (newCategories) => {
        setLoading(true);
        try {
            await fetch("/api/updateBook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookId: book._id, categories: newCategories })
            });
            router.refresh();
        } catch (error) {
            console.error("Failed to update categories:", error);
            setLoading(false);
        } finally {
            setTimeout(() => setLoading(false), 1500);
        }
    };

    const handleAddCategory = async (category) => {
        const updatedCategories = [...book.categories, category];
        await updateCategories(updatedCategories);
        setOpen(false);
    };

    const handleRemoveCategory = async (category) => {
        const updatedCategories = book.categories.filter(cat => cat !== category);
        await updateCategories(updatedCategories);
    };

    return (
        <div>
            <p className="font-bold text-lg/10 mb-2">Categories:</p>
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <ul className="flex flex-wrap gap-4 items-center">
                    {book.categories.sort().map((cat) => (
                        <li key={cat} className="bg-violet-500 rounded-md px-3 py-2 text-violet-100 flex items-center">
                            {cat}
                            {user && (
                                <button
                                    onClick={() => handleRemoveCategory(cat)}
                                    className="ml-2 text-white hover:text-red-400 cursor-pointer "
                                >
                                    ✕
                                </button>
                            )}
                        </li>
                    ))}
                    {user && (
                        <button onClick={() => setOpen(true)} className="ml-2 text-violet-500 hover:text-violet-700 cursor-pointer">
                            <FaPlus className="w-5 h-5" />
                        </button>
                    )}
                </ul>
            )}
            

            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                        {!categoryType ? (
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => setCategoryType("fiction")}
                                    className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-700"
                                >
                                    Fiction
                                </button>
                                <button
                                    onClick={() => setCategoryType("non-fiction")}
                                    className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-700"
                                >
                                    Non-Fiction
                                </button>
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-2">
                                {(categoryType === "fiction" ? fiction : nonFiction)
                                    .filter(cat => !book.categories.includes(cat))
                                    .sort().map((cat) => (
                                        <li key={cat}>
                                            <button
                                                onClick={() => handleAddCategory(cat)}
                                                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        )}
                        <button
                            onClick={() => {
                                setOpen(false);
                                setCategoryType(null);
                            }}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                        >
                            Close
                        </button>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}
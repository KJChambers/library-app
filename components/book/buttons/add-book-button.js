'use client';

import { AddBookRedirect, SearchRedirect } from "@/action/book";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function AddBookButton() {
    let [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="px-3 py-2 cursor-pointer font-semibold bg-violet-600 text-violet-100 hover:bg-violet-500 rounded-md shadow-xs"
                onClick={() => setIsOpen(true)}
            >
                + Add Book
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/35">
                    <DialogPanel className="max-w-lg space-y-4 text-center rounded-lg shadow-sm bg-white dark:bg-slate-600 text-violet-950 dark:text-violet-100 p-8">
                        <DialogTitle className="font-bold text-lg">Add a New Book</DialogTitle>
                        <p>We suggest searching our Book Archives for existing books first, then you can add a book manually if we don't have it!</p>
                        <p className="mt-2 font-bold">Choose how you would like to add a book</p>
                        <div className="flex justify-center gap-4">
                            <form action={SearchRedirect}>
                                <button
                                    type="submit"
                                    className="px-3 py-2 mt-2 cursor-pointer font-semibold bg-violet-600 dark:bg-violet-700 text-violet-100 hover:bg-violet-500 dark:hover:bg-violet-600 rounded-md shadow-xs"
                                >
                                    Search Archives
                                </button>
                            </form>
                            <form action={AddBookRedirect}>
                                <button 
                                    type="submit"
                                    className="px-3 py-2 mt-2 cursor-pointer font-semibold text-violet-950 dark:text-violet-100 hover:bg-gray-300/50 dark:hover:bg-gray-500/50 rounded-md hover:shadow-xs"
                                >
                                    Add Manually
                                </button>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
'use client';

import { AddBookRedirect, SearchRedirect } from "@/action/add-book";
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
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-600/30">
                    <DialogPanel className="max-w-lg space-y-4 text-center rounded-lg shadow-sm bg-white p-8">
                        <DialogTitle className="font-bold text-lg">Add a New Book</DialogTitle>
                        <Description>Choose how you would like to add a book</Description>
                        <div className="flex justify-center gap-4">
                            <form action={SearchRedirect}>
                                <button 
                                    type="submit"
                                    className="px-3 py-2 mt-2 cursor-pointer font-semibold bg-violet-600 text-violet-100 hover:bg-violet-500 rounded-md shadow-xs"
                                >
                                    Search Archives
                                </button>
                            </form>
                            <form action={AddBookRedirect}>
                                <button 
                                    type="submit"
                                    className="px-3 py-2 mt-2 cursor-pointer font-semibold text-violet-950 hover:bg-gray-300/50 rounded-md hover:shadow-xs"
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
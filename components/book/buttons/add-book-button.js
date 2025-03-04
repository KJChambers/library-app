"use client";

import { AddBookRedirect, SearchRedirect } from "@/action/book";
import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle
} from "@headlessui/react";
import { useState } from "react";

export default function AddBookButton() {
	let [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				className="cursor-pointer rounded-md bg-violet-600 px-3 py-2 font-semibold text-violet-100 shadow-xs hover:bg-violet-500"
				onClick={() => setIsOpen(true)}
			>
				+ Add Book
			</button>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="relative z-50"
			>
				<div className="fixed inset-0 flex w-screen items-center justify-center bg-black/35 p-4">
					<DialogPanel className="max-w-lg space-y-4 rounded-lg bg-white p-8 text-center text-violet-950 shadow-sm dark:bg-slate-600 dark:text-violet-100">
						<DialogTitle className="text-lg font-bold">
							Add a New Book
						</DialogTitle>
						<p>
							We suggest searching our Book Archives for existing
							books first, then you can add a book manually if we
							don't have it!
						</p>
						<p className="mt-2 font-bold">
							Choose how you would like to add a book
						</p>
						<div className="flex justify-center gap-4">
							<form action={SearchRedirect}>
								<button
									type="submit"
									className="mt-2 cursor-pointer rounded-md bg-violet-600 px-3 py-2 font-semibold text-violet-100 shadow-xs hover:bg-violet-500 dark:bg-violet-700 dark:hover:bg-violet-600"
								>
									Search Archives
								</button>
							</form>
							<form action={AddBookRedirect}>
								<button
									type="submit"
									className="mt-2 cursor-pointer rounded-md px-3 py-2 font-semibold text-violet-950 hover:bg-gray-300/50 hover:shadow-xs dark:text-violet-100 dark:hover:bg-gray-500/50"
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

"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import EditBookButton from "./edit-book-submit";
import DateSelect, { dateFormats } from "./date-select";
import Link from "next/link";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { handleIsbnChange } from "@/lib/book/isbn";

export default function EditBookForm({ action, book }) {
	const [state, formAction] = useActionState(action, {});
	const [isbnExists, setIsbnExists] = useState(false);
	const [isbnTen, setIsbnTen] = useState(false);
	const [bookPrev, setBookPrev] = useState({});
	const [authorPrev, setAuthorPrev] = useState(null);
	const [worksData, setWorksData] = useState({});
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	dayjs.extend(customParseFormat);
	const [formData, setFormData] = useState({
		ISBN: book.ISBN,
		title: book.title,
		desc: book.desc,
		authors: book.authors,
		pages: book.pages,
		publisher: book.publisher,
		pubDate: dayjs(book.pub_date, dateFormats).toDate()
	});

	const formChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const autofillData = () => {
		setFormData({
			title: bookPrev.title || "",
			desc: worksData.description?.value
				? worksData.description.value
				: worksData.description || "",
			authors: authorPrev || "",
			pages: bookPrev.number_of_pages || "",
			publisher: bookPrev.publishers?.[0] || "",
			pubDate:
				dayjs(bookPrev.publish_date, dateFormats).toDate() || new Date()
		});
		setOpen(false);
	};

	useEffect(() => {
		if (state.success) setSubmitted(true);
	}, [state.success]);

	useEffect(() => {
		if (submitted) {
			window.scrollTo({ top: 0, behavior: "smooth" });
			setSubmitted(false);
		}
	}, [submitted]);

	const handleSubmit = async e => {
		e.preventDefault();
		startTransition(() => formAction(new FormData(e.target)));
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 px-0 sm:mx-auto sm:w-full sm:max-w-sm"
		>
			<div className="relative">
				<label
					htmlFor="isbn"
					className="flex items-center gap-2 text-sm/6 font-medium text-violet-950 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-violet-100"
				>
					ISBN 13
					<div className="group relative">
						<span className="cursor-help text-sm font-bold text-violet-600 dark:text-violet-400">
							?
						</span>
						<div className="absolute left-1/2 mt-1 hidden w-40 -translate-x-1/2 rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-md group-hover:block">
							Usually found on the back cover. Can be found on
							Goodreads or OpenLibrary.
						</div>
					</div>
				</label>
				<div className="mt-2">
					<input
						id="isbn"
						name="isbn"
						type="text"
						autoComplete="off"
						placeholder="9780099409960"
						value={formData.ISBN}
						onChange={e =>
							handleIsbnChange(
								e.target.value,
								setBookPrev,
								setIsbnTen,
								setIsbnExists,
								setWorksData,
								setAuthorPrev,
								setOpen,
								true,
								formData,
								setFormData
							)
						}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-violet-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 dark:bg-slate-500 dark:text-violet-100 dark:placeholder:text-violet-100/50 dark:focus:outline-violet-400"
					/>
				</div>
				{formData.ISBN !== book.ISBN && isbnExists && (
					<div className="text-red-500">
						<span>ISBN already exists in our archives - </span>
						<Link
							className="text-violet-700 hover:text-violet-500 dark:text-violet-100 dark:hover:text-violet-300"
							href={`/books/${formData.ISBN}`}
						>
							Go to book page!
						</Link>
					</div>
				)}
				{isbnTen && (
					<div className="text-red-500">
						<span>
							Seems like you've input an ISBN 10. Please use ISBN
							13.
						</span>
					</div>
				)}
				{open && (
					<div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md dark:bg-slate-600">
						<div
							className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-slate-700"
							onClick={() => autofillData()}
						>
							<p className="font-semibold">{bookPrev.title}</p>
							<p className="text-sm text-gray-600 dark:text-gray-300/80">
								{authorPrev}
							</p>
						</div>
					</div>
				)}
			</div>

			<div className="relative">
				<label
					htmlFor="title"
					className="block text-sm/6 font-medium text-violet-950 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-violet-100"
				>
					Title
				</label>
				<div className="mt-2">
					<input
						id="title"
						name="title"
						type="text"
						autoComplete="off"
						placeholder="Star Wars: Episode I - The Phantom Menace"
						value={formData.title}
						onChange={formChange}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-violet-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 dark:bg-slate-500 dark:text-violet-100 dark:placeholder:text-violet-100/50 dark:focus:outline-violet-400"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="desc"
					className="block text-sm/6 font-medium text-violet-950 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-violet-100"
				>
					Description
				</label>
				<div className="mt-2">
					<textarea
						id="desc"
						name="desc"
						rows={4}
						maxLength={1600}
						minLength={10}
						value={formData.desc}
						onChange={formChange}
						placeholder="A long time ago in a galaxy far, far away..."
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-violet-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 dark:bg-slate-500 dark:text-violet-100 dark:placeholder:text-violet-100/50"
					/>
				</div>
				<p className="text-end text-sm/6 text-gray-600 dark:text-gray-400/80">
					{formData.desc.length}/1600 characters used
				</p>
			</div>

			<div>
				<label
					htmlFor="authors"
					className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100"
				>
					Author(s)
				</label>
				<div className="mt-2">
					<input
						id="authors"
						name="authors"
						type="text"
						autoComplete="on"
						placeholder="Terry Brooks"
						value={formData.authors}
						onChange={formChange}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-violet-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 dark:bg-slate-500 dark:text-violet-100 dark:placeholder:text-violet-100/50 dark:focus:outline-violet-400"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="pages"
					className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100"
				>
					Pages
				</label>
				<div className="mt-2">
					<input
						id="pages"
						name="pages"
						type="number"
						autoComplete="off"
						placeholder="324"
						min={0}
						value={formData.pages || ""}
						onChange={formChange}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-violet-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 dark:bg-slate-500 dark:text-violet-100 dark:placeholder:text-violet-100/50 dark:focus:outline-violet-400"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="publisher"
					className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100"
				>
					Publisher
				</label>
				<div className="mt-2">
					<input
						id="publisher"
						name="publisher"
						type="text"
						autoComplete="on"
						placeholder="Arrow Books"
						value={formData.publisher}
						onChange={formChange}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-violet-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 dark:bg-slate-500 dark:text-violet-100 dark:placeholder:text-violet-100/50 dark:focus:outline-violet-400"
					/>
				</div>
			</div>

			<DateSelect formData={formData} setFormData={setFormData} />

			<input
				type="hidden"
				name="oldISBN"
				id="oldISBN"
				value={book.ISBN}
			/>

			<div>
				{state.errors && (
					<ul className="text-red-500">
						{state.errors.map(error => (
							<li key={error}>{error}</li>
						))}
					</ul>
				)}
			</div>

			<div>
				<EditBookButton />
			</div>
		</form>
	);
}

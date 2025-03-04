'use client';

import { useActionState, useState } from "react";
import CategorySelect from "./category-select";
import NewBookSubmitButton from "./new-book-submit";
import DateSelect, { dateFormats } from "./date-select";
import Link from "next/link";
import { fetchAuthorFromKey, HandleISBN } from "@/action/book";
import { fetchWorks } from "@/lib/book";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function NewBookForm({ action, userData }) {
    const [state, formAction] = useActionState(action, {});
    const [desc, setDesc] = useState("");
    const [isbnExists, setIsbnExists] = useState(false);
    const [isbnTen, setIsbnTen] = useState(false);
    const [bookData, setBookData] = useState({});
    const [worksData, setWorksData] = useState({});
    const [authorPrev, setAuthorPrev] = useState("");
    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [pubDate, setPubDate] = useState(new Date());
    const [author, setAuthor] = useState("")
    const [pages, setPages] = useState(null);
    const [open, setOpen] = useState(false);

    const handleIsbnChange = async (inputISBN) => {
        const cleanISBN = inputISBN.replace(/-/g, '').trim();
        if (![10, 13].includes(cleanISBN.length)) return resetState();

        const res = await HandleISBN(cleanISBN);

        setBookData(res.bookData || {});
        if (res.isbnExists) return setIsbnExists(true);
        
        setIsbnTen(res.isbnTen);
        setIsbnExists(false);

        if (res.isbnTen || !res.bookData) return;

        const worksDataRes = res.bookData.works?.[0]?.key ? await fetchWorks(res.bookData.works[0].key) : {};
        setWorksData(worksDataRes);

        const authorKey = res.bookData.authors?.[0]?.key || worksDataRes.authors?.[0]?.author.key;
        if (authorKey) {
            const authorData = await fetchAuthorFromKey(authorKey);
            setAuthorPrev(authorData.name || authorData.personal_name || "Unknown Author");
        };
        setOpen(true);
    };

    const autofillData = () => {
        setTitle(bookData.title || "");
        setDesc(worksData.description || "");
        setAuthor(authorPrev || "");
        setPublisher(bookData.publishers?.[0] || "");
        dayjs.extend(customParseFormat);
        setPubDate(dayjs(bookData.publish_date, dateFormats).toDate() || new Date());
        setPages(bookData.number_of_pages || "");
        setOpen(false);
    }

    const resetState = () => {
        setIsbnExists(false);
        setIsbnTen(false);
        setOpen(false);
    }

    return (
        <form action={formAction} className="space-y-6">

            <div className="relative">
                <label htmlFor="isbn" className="text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*'] flex items-center gap-2">
                    ISBN 13
                    <div className="relative group">
                        <span className="cursor-help text-violet-600 dark:text-violet-400 text-sm font-bold">?</span>
                        <div className="absolute left-1/2 -translate-x-1/2 mt-1 hidden w-40 rounded-md bg-gray-800 text-white text-xs px-2 py-1 shadow-md group-hover:block">
                            Usually found on the back cover. Can be found on Goodreads or OpenLibrary.
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
                        defaultValue={(state.payload?.get("isbn") || "")}
                        onChange={e => handleIsbnChange(e.target.value)}
                        className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                    />
                </div>
                {isbnExists && (
                    <div className="text-red-500">
                        <span>ISBN exists - </span>
                        <Link className="text-violet-700 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300" href={`/books/${bookData.ISBN}`}>Go to book page!</Link>
                    </div>
                )}
                {isbnTen && (
                    <div className="text-red-500">
                        <span>Using ISBN-10. Use ISBN-13: {bookData.isbn_13?.[0]}</span>
                    </div>
                )}
                {open && (
                    <div className="absolute z-10 w-full bg-white dark:bg-slate-600 border border-gray-200 rounded-md shadow-md mt-1">
                        <div
                            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                            onClick={() => autofillData()}
                        >
                            <p className="font-semibold">{bookData.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300/80">{authorPrev}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative">
                <label htmlFor="title" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*']">
                    Title
                </label>
                <div className="mt-2">
                    <input
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        placeholder="Star Wars: Episode I - The Phantom Menace"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="desc" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*']">
                    Description
                </label>
                <div className="mt-2">
                    <textarea
                        id="desc"
                        name="desc"
                        rows={4}
                        maxLength={1600}
                        minLength={10}
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        placeholder="A long time ago in a galaxy far, far away..."
                        className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                    />
                </div>
                <p className="text-end text-gray-600 dark:text-gray-400/80 text-sm/6">{desc.length}/1600 characters used</p>
            </div>

            <div>
                <label htmlFor="authors" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100">
                    Author(s)
                </label>
                <div className="mt-2">
                    <input
                        id="authors"
                        name="authors"
                        type="text"
                        autoComplete="on"
                        placeholder="Terry Brooks"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="pages" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100">
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
                        value={pages || ""}
                        onChange={e => setPages(e.target.value)}
                        className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="publisher" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100">
                    Publisher
                </label>
                <div className="mt-2">
                    <input
                        id="publisher"
                        name="publisher"
                        type="text"
                        autoComplete="on"
                        placeholder="Arrow Books"
                        value={publisher}
                        onChange={e => setPublisher(e.target.value)}
                        className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                    />
                </div>
            </div>

            <DateSelect date={pubDate} setDate={setPubDate} />

            <CategorySelect />

            <div>
                {state.errors && (
					<ul className="text-red-500">
						{state.errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				)}
            </div>
            <div>
                <NewBookSubmitButton />
            </div>

            <input type="hidden" value={userData.username} name="username" />
            <input type="hidden" value={bookData?.works?.[0]?.key || ""} name="works" />

        </form>
    )
}
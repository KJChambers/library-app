import { editBook } from "@/action/book";
import BookDesc from "@/components/book/book-desc";
import BookList from "@/components/book/book-list";
import {
	AddExistingBookButton,
	NoUserButton,
	RemoveBookButton
} from "@/components/book/buttons/book-page-buttons";
import CategoryList from "@/components/book/category-list";
import CoverImage from "@/components/book/cover-image";
import { dateFormats } from "@/components/forms/book/date-select";
import EditBookForm from "@/components/forms/book/edit-book";
import { fetchAmazon, fetchIsbnTen, fetchWaterstones } from "@/lib/book";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { Book } from "@/models/book";
import { User } from "@/models/user";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaAmazon, FaShoppingCart } from "react-icons/fa";

export default async function BookInfoPage({ params }) {
	await connectDB();

	const [{ ISBN }, session] = await Promise.all([params, getSession()]);
	const user = session?.user;
	const [rawUserData, rawBookData] = await Promise.all([
		User.findOne({ email: user?.email }).lean(),
		Book.findOne({ ISBN }).lean()
	]);
	if (!rawBookData) notFound();

	const bookData = {
		...rawBookData,
		_id: rawBookData._id.toString(),
		works: rawBookData.works.map(work => ({
			...work,
			_id: work._id.toString()
		}))
	};

	let userData = null;
	let userHasBook = null;
	if (rawUserData) {
		userData = {
			...rawUserData,
			_id: rawUserData._id.toString(),
			saved_books: rawUserData.saved_books.map(book => ({
				...book,
				_id: book._id.toString()
			}))
		};

		userHasBook = userData.saved_books.some(
			book => book.bookId === bookData._id.toString()
		);
	}

	const [isbnTen, waterstones, userList, bookEditions] = await Promise.all([
		fetchIsbnTen(bookData.ISBN),
		fetchWaterstones(bookData.ISBN),
		User.find({ "saved_books.bookId": bookData._id }),
		Book.find({ "works.key": bookData.works[0].key })
	]);

	let amazon = { success: false };
	if (isbnTen) amazon = await fetchAmazon(isbnTen);

	const pubDate = dayjs(bookData.pub_date, dateFormats).format(
		"DD MMM, YYYY"
	);

	return (
		<div>
			<div className="mx-auto my-7 w-full rounded-md bg-white p-6 text-violet-950 shadow-xs md:w-2xl lg:w-5xl dark:bg-slate-900 dark:text-violet-100">
				<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
					<div className="col-span-1">
						<div className="relative mx-auto mb-4 aspect-5/8 h-auto w-44 overflow-hidden shadow-md md:w-full">
							<CoverImage book={bookData} />
						</div>
						<div className="mx-auto w-44 space-y-4 md:w-full">
							{userData ? (
								userHasBook ? (
									<RemoveBookButton
										book={bookData}
										user={userData}
									/>
								) : (
									<AddExistingBookButton
										book={bookData}
										user={userData}
									/>
								)
							) : (
								<NoUserButton />
							)}
							{amazon.success && (
								<>
									<a
										href={amazon.url}
										className="mx-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-2 py-3 text-violet-950 outline-2 outline-gray-300 hover:bg-gray-200 dark:bg-slate-800 dark:text-violet-100 dark:hover:bg-slate-600"
										rel="noopener noreferrer"
										target="_blank"
									>
										<FaAmazon className="h-6 w-6" />
										<span className="font-bold">
											Buy on Amazon
										</span>
									</a>
									<p className="text-xs text-gray-500 text-center">As an Amazon Associate, The Book Chamber earns from qualifying purchases.</p>
								</>
							)}
							{waterstones && (
								<a
									href={`https://waterstones.com/book/${ISBN}`}
									className="mx-auto mb-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-2 py-3 text-violet-950 outline-2 outline-gray-300 hover:bg-gray-200 dark:bg-slate-800 dark:text-violet-100 dark:hover:bg-slate-600"
									rel="noopener noreferrer"
									target="_blank"
								>
									<FaShoppingCart className="h-6 w-6" />
									<span className="font-bold">
										Buy on Waterstones
									</span>
								</a>
							)}
						</div>
					</div>
					<div className="col-span-1 space-y-7 px-5 py-3 sm:col-span-2 md:col-span-3">
						<p className="text-xl font-bold">{bookData.title}</p>
						<p className="font-semibold">By {bookData.authors}</p>
						<BookDesc desc={bookData.desc} />
						{userList.length === 0 ? (
							<p className="font-semibold">
								Be the first to own this book!
							</p>
						) : (
							<p className="font-semibold">
								{userList.length}{" "}
								{userList.length === 1
									? "person owns"
									: "people own"}{" "}
								this book!
							</p>
						)}
						<CategoryList book={bookData} user={userData} />
						<ul>
							<li>
								<strong>ISBN 13:</strong> {bookData.ISBN}
							</li>
							<li>
								<strong>ISBN 10:</strong> {isbnTen || "N/A"}
							</li>
							<li>
								<strong>Pages:</strong> {bookData.pages}
							</li>
							<li>
								<strong>Publisher:</strong> {bookData.publisher}
							</li>
							<li>
								<strong>Published:</strong> {pubDate}
							</li>
							{bookData.works[0].key && (
								<li>
									<strong>Editions:</strong>{" "}
									{bookEditions.length}
								</li>
							)}
						</ul>
					</div>
				</div>
				{bookData.works[0].key && (
					<div className="col-span-full">
						<p className="mt-10 text-2xl font-bold">
							All Editions:
						</p>
						<BookList
							books={JSON.parse(JSON.stringify(bookEditions))}
							className="grid grid-cols-1 justify-items-stretch gap-10 md:grid-cols-2 lg:grid-cols-4"
							publisher={true}
							date={true}
						/>
					</div>
				)}
			</div>
			<div className="mx-auto my-7 w-full rounded-md bg-white p-6 text-violet-950 shadow-xs md:w-2xl lg:w-5xl dark:bg-slate-900 dark:text-violet-100">
				{userData ? (
					<div className="space-y-10">
						<p className="text-center text-xl font-bold">
							Edit Book Details
						</p>
						<EditBookForm action={editBook} book={bookData} />
					</div>
				) : (
					<span className="inline-block w-full text-center">
						<Link
							href="/login"
							className="text-violet-500 hover:text-violet-700"
						>
							Log in
						</Link>{" "}
						to edit book details
					</span>
				)}
			</div>
		</div>
	);
}

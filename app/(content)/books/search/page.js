import searchBooks from "@/action/search-books";
import BookList from "@/components/book/book-list";
import CategoryFilter from "@/components/book/search/filters";
import SearchBar from "@/components/book/search/search-bar";
import Link from "next/link";

export default async function SearchResultsPage({ searchParams }) {
	const params = await searchParams;
	const query = params.query?.replaceAll("-", " ") || "";
	let category = params.category?.replaceAll("-", " ") || "";
	if (category === "Self help") category = "Self-help";

	let books = [];
	if (query || category) {
		books = JSON.parse(await searchBooks(query, { category }));
	}

	return (
		<div className="mx-0 my-10 grid grid-cols-1 justify-items-stretch gap-10 text-center text-violet-950 sm:mx-40 md:grid-cols-2 md:text-left lg:grid-cols-4 dark:text-violet-100">
			<div className="col-span-full rounded-md bg-gray-200/75 p-4 shadow-md dark:bg-slate-400/75">
				<SearchBar
					initialQuery={query}
					category={category}
					inputClasses="bg-white dark:bg-slate-500"
					clearable
				/>
			</div>
			<div className="col-span-1 rounded-md bg-gray-200/75 p-4 shadow-md dark:bg-slate-400/75">
				<CategoryFilter query={query} currentCategory={category} />
			</div>
			<div className="col-span-1 lg:col-span-3">
				{books.length > 0 ? (
					<BookList
						books={books}
						className="grid grid-cols-1 justify-items-stretch gap-10 md:ms-10 lg:grid-cols-2 xl:grid-cols-4"
						scrollable
					/>
				) : (
					<div className="mt-10 text-center">
						<h1 className="text-2xl/10 font-bold">
							Perhaps the archives are incomplete...
						</h1>
						<div>
							<span>No books match your search! </span>
							<Link
								href="/new-book"
								className="text-violet-700 hover:text-violet-500 dark:text-violet-100 dark:hover:text-violet-300"
							>
								Add book manually
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

import CategorySelector from "@/components/book/search/category-selector";
import SearchBar from "@/components/book/search/search-bar";

export default function BooksPage() {
	return (
		<div className="mx-auto my-7 w-full rounded-md bg-white p-6 text-violet-950 shadow-xs md:w-2xl lg:w-5xl dark:bg-slate-900 dark:text-violet-100">
			<h1 className="pb-5 text-center text-4xl font-bold">
				Book Archives
			</h1>
			<p className="text-center font-semibold">Search for a book</p>

			<SearchBar className="mt-4" />

			<div className="my-5 flex items-center justify-center">
				<div className="w-1/3 border-t border-gray-400"></div>
				<span className="mx-4 text-gray-500">OR</span>
				<div className="w-1/3 border-t border-gray-400"></div>
			</div>

			<p className="text-center font-semibold">Pick a category</p>

			<CategorySelector />
		</div>
	);
}

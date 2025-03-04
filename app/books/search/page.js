import searchBooks from "@/action/search-books";
import BookList from "@/components/book/book-list";
import CategoryFilter from "@/components/book/search/filters";
import SearchBar from "@/components/book/search/search-bar";
import Link from "next/link";

export default async function SearchResultsPage({ searchParams }) {
    const params = await searchParams;
    const query = params.query?.replaceAll('-', ' ') || "";
    let category = params.category?.replaceAll('-', ' ') || "";
    if (category === "Self help") category = "Self-help";

    let books = [];
    if (query || category) {
        books = JSON.parse(await searchBooks(query, { category }));
    }

    return (
        <div className="my-10 mx-0 sm:mx-40 grid grid-cols-1 text-center md:text-left md:grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-10 text-violet-950 dark:text-violet-100">
            <div className="col-span-full p-4 rounded-md bg-gray-200/75 dark:bg-slate-400/75 shadow-md">
                <SearchBar initialQuery={query} category={category} inputClasses="bg-white dark:bg-slate-500" clearable />
            </div>
            <div className="col-span-1 p-4 rounded-md bg-gray-200/75 dark:bg-slate-400/75 shadow-md">
                <CategoryFilter query={query} currentCategory={category} />
            </div>
            <div className="col-span-1 lg:col-span-3">
                {books.length > 0 ?
                    <BookList books={books} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 justify-items-stretch md:ms-10" scrollable /> : (
                        <div className="text-center mt-10">
                            <h1 className="font-bold text-2xl/10">Perhaps the archives are incomplete...</h1>
                            <div>
                                <span>No books match your search! </span>
                                <Link href="/new-book" className="text-violet-700 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300">Add book manually</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
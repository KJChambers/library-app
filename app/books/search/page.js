import searchBooks from "@/action/search-books";
import BookList from "@/components/book/book-list";

export default async function SearchResultsPage({ searchParams }) {
    const params = await searchParams;
    const query = params.query?.replace('-', ' ') || "";
    const category = params.category?.replace('-', ' ') || "";
    const amount = params.amount || 20;

    let books = [];
    if (query || category) {
        books = JSON.parse(await searchBooks(query, { category }, amount));
    }

    return (
        <div className="my-10 mx-0 sm:mx-40 grid grid-cols-1 text-center md:text-left md:grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-10 text-violet-950 dark:text-violet-100">
            <div className="col-span-full">
                {/* Here, I want a bar which has the search bar with the query in, and sort options */}
            </div>
            <div className="col-span-1">
                {/* Here, I want a bar with other filters, such as: category, author, publisher, date, pages */}
            </div>
            <div className="col-span-1 lg:col-span-3">
                {books.length > 0 ?
                    <BookList books={books} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 justify-items-stretch" /> : (
                        <div className="text-center">
                            <h1 className="font-bold text-2xl/10">Perhaps the archives are incomplete...</h1>
                            <p>No books match your search!</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
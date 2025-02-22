import CategorySelector from "@/components/book/search/category-selector";
import SearchBar from "@/components/book/search/search-bar";

export default function BooksPage() {
    return (
        <div className="p-6 my-7 mx-auto w-full md:w-2xl lg:w-5xl rounded-md shadow-xs bg-white dark:bg-slate-900 text-violet-950 dark:text-violet-100">
            <h1 className="text-center font-bold text-4xl pb-5">Book Archives</h1>
            <p className="text-center font-semibold">Search for a book</p>

            <SearchBar className="mt-4" />
            
            <div className="flex items-center justify-center my-5">
                <div className="w-1/3 border-t border-gray-400"></div>
                <span className="mx-4 text-gray-500">OR</span>
                <div className="w-1/3 border-t border-gray-400"></div>
            </div>

            <p className="text-center font-semibold">Pick a category</p>

            <CategorySelector />
        </div>
    );
}
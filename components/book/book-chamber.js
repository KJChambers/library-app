import { Book } from "@/models/book";
import BookList from "./book-list";

export default async function BookChamber({ userData }) {

    const bookIds = userData.saved_books.map((entry) => entry.bookId);

    if (!bookIds.length) {
        return <p className="mt-10 text-center text-violet-950 dark:text-violet-100">No books to show!</p>;
    }

    const bookList = await Book.find({ _id: { $in: bookIds } });

    return <BookList books={JSON.parse(JSON.stringify(bookList))} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-10" scrollable />
}
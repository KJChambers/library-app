import { getSession } from "@/lib/get-session"
import { Book } from "@/models/book";
import { notFound } from "next/navigation";

export default async function BookInfoPage({ params }) {
    const [{ ISBN }, session] = await Promise.all([
        params,
        getSession()
    ]);
    const user = session?.user;
    const bookData = await Book.findOne({ ISBN });
    if (!bookData) notFound();

    return (
        <div className="p-6 my-7 mx-auto w-full md:w-2xl lg:w-5xl rounded-md shadow-xs bg-white dark:bg-slate-900 text-violet-950 dark:text-violet-100">
            <h1 className="text-center font-bold text-4xl pb-5">Under Construction</h1>
            <p className="text-center font-semibold">Looks like you've stumbled upon a feature being worked on! Come back later to see this.</p>
        </div>
    )
}
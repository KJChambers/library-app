import { AddBook } from "@/action/book";
import NewBookForm from "@/components/forms/book/new-book-form";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { User } from "@/models/user";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

export default async function NewBookPage() {
	const session = await getSession();
	const user = session?.user;
	if (!user) redirect("/login");
	await connectDB();
	const userData = await User.findOne({ email: user.email });

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<BookmarkIcon
					aria-hidden="true"
					className="mx-auto size-7 text-violet-950 dark:text-violet-100"
				/>
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-violet-950 dark:text-violet-100">
					Create a Book
				</h2>
				<p className="mt-5 text-center text-lg/9 tracking-tight text-gray-500 dark:text-gray-100">
					Input the ISBN to autofill fields!
				</p>
				<p className="text-center text-sm/9 tracking-tight text-gray-500 dark:text-gray-100">
					All submissions will be moderated
				</p>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<NewBookForm
					action={AddBook}
					userData={JSON.parse(JSON.stringify(userData))}
				/>
			</div>
		</div>
	);
}

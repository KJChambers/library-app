import login from "@/action/login";
import Link from "next/link";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import LoginForm from "@/components/forms/login/login-form";
import GoogleButton from "@/components/google";
import { getUniqueUser } from "@/lib/db";

export default async function LoginPage() {
	const session = await getSession();
	const user = session?.user;
	if (user) {
		const data = await getUniqueUser("email", user.email);
		redirect(`/profile/${data.username}`);
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<BookmarkIcon
					aria-hidden="true"
					className="mx-auto size-7 text-violet-950 dark:text-violet-100"
				/>
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-violet-950 dark:text-violet-100">
					Login
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<GoogleButton />
				<div className="mb-3 flex items-center text-gray-400 before:m-1.5 before:mb-0 before:flex-1 before:rounded-full before:bg-gray-300 before:p-0.5 before:content-[''] after:m-1.5 after:mb-0 after:flex-1 after:rounded-full after:bg-gray-300 after:p-0.5 after:content-[''] dark:text-slate-600 dark:before:bg-slate-600 dark:after:bg-slate-600">
					or
				</div>
				<LoginForm action={login} />

				<p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
					Don't have an account?{" "}
					<Link
						href="/register"
						className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-500 dark:hover:text-violet-600"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}

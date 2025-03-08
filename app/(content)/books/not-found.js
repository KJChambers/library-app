import Link from "next/link";

export default function NotFoundPage() {
	return (
		<div className="mx-auto my-7 w-full rounded-md bg-white p-6 text-violet-950 shadow-xs md:w-2xl lg:w-5xl dark:bg-slate-900 dark:text-violet-100">
			<div className="text-center">
				<h1 className="text-2xl/10 font-bold">
					Perhaps the archives are incomplete...
				</h1>
				<div>
					<span>We can't find that book! </span>
					<Link
						href="/new-book"
						className="text-violet-700 hover:text-violet-500 dark:text-violet-100 dark:hover:text-violet-300"
					>
						Add book manually
					</Link>
				</div>
			</div>
		</div>
	);
}

import Link from "next/link";

export default function Home() {
	return (
		<div className="relative isolate px-6 pt-4 lg:px-8">
			<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<div className="hidden sm:mb-8 sm:flex sm:justify-center">
					<div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
						See our development story on GitHub.{' '}
						<Link href="https://github.com/KJChambers/library-app" className="font-semibold text-violet-600">
							<span aria-hidden="true" className="absolute inset-0" />
							Read more <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
				<div className="text-center">
					<h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
						Your personal reading haven on the web
					</h1>
					<p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-x1/8">
						Discover a smarter way to manage your books, keep track of your favourites, and never lose sigh of what you've read - 
						or what's next on your list. Start building your personal book chamber today!
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link 
							href="/register"
							className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Get started
						</Link>
						<Link href="https://github.com/KJChambers/library-app" className="text-sm/6 font-semibold text-gray-900">
							Development <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

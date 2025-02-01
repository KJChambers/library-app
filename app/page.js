import Link from "next/link";

export default function Home() {
	return (
		<div className="relative isolate px-6 pt-4 lg:px-8">
			<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<div className="hidden sm:mb-8 sm:flex sm:justify-center">
					<div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
						Announcing our next round of funding.{' '}
						<Link href="/" className="font-semibold text-violet-600">
							<span aria-hidden="true" className="absolute inset-0" />
							Read more <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
				<div className="text-center">
					<h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
						Data to enrich your online business
					</h1>
					<p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-x1/8">
						Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
						fugiat veniam occaecat.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link 
							href="/"
							className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Get started
						</Link>
						<Link href="/" className="text-sm/6 font-semibold text-gray-900">
							Learn more <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

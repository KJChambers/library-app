import { getSession } from "@/lib/get-session";
import { getUniqueUser } from "@/lib/db";
import MobileMenu from "./mobile-menu";
import Link from "next/link";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "../nav-link";
import { UserMenu } from "./user-menu";

export default async function Header() {
	const session = await getSession();
	const user = session?.user;

	let userData = null;
	if (user) {
		userData = await getUniqueUser("email", user.email);
	}

	const pages = user
		? [{ href: "/books", name: "Archives" }]
		: [
				{ href: "/books", name: "Archives" },
				{ href: "/login", name: "Login" },
				{ href: "/register", name: "Register" }
			];

	return (
		<header className="bg-white p-6 dark:bg-slate-900">
			<nav className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<MobileMenu pages={pages} />
					<div className="flex flex-1 items-center justify-center text-lg font-bold sm:items-stretch sm:justify-between">
						<div className="flex shrink-0 items-center">
							<Link href="/">
								<BookmarkIcon className="size-7 text-violet-950 dark:text-violet-100" />
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{pages.map(page => (
									<NavLink
										key={page.name}
										className="rounded-xl p-2"
										href={page.href}
									>
										{page.name}
									</NavLink>
								))}
							</div>
						</div>
					</div>
					{user && (
						<UserMenu
							userData={JSON.parse(JSON.stringify(userData))}
						/>
					)}
				</div>
			</nav>
		</header>
	);
}

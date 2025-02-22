import { DropdownNavLink, NavLink } from "./nav-link";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { getSession } from "@/lib/get-session";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/auth";
import { User } from "@/models/user";
import connectDB from "@/lib/db";

export default async function Header() {
    const session = await getSession();
    const user = session?.user;

	let userData = null;
	if (user) {
		await connectDB();
		userData = await User.findOne({ email: user.email });
	}

	const pages = user
		? [{ href: '/books', name: 'Archives'}]
		: [
			{ href: '/books', name: 'Archives'},
			{ href: '/login', name: 'Login' },
			{ href: '/register', name: 'Register' }
		];

    return (
        <header className="p-6 bg-white dark:bg-slate-900">
            <Disclosure as="nav">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-violet-950 dark:text-violet-100 hover:bg-violet-700 hover:text-violet-100">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-7 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-7 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                        <div className="text-lg font-bold flex flex-1 items-center sm:items-stretch justify-center sm:justify-between">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <BookmarkIcon aria-hidden="true" className="text-violet-950 dark:text-violet-100 size-7" />
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {pages.map((page) => (
                                        <NavLink key={page.name} className="rounded-xl p-2" href={page.href}>{page.name}</NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
						{user ? 
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<Menu as="div" className="relative ml-3">
									<div>
										<MenuButton className="cursor-pointer relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
											<span className="absolute -inset-1.5" />
											<span className="sr-only">Open user menu</span>
											<Image 
												alt="Profile picture"
												src={userData.imageUrl}
												className="size-11 rounded-full"
												height={300}
												width={300}
												priority
											/>
										</MenuButton>
									</div>
									<MenuItems
										transition
										className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-500 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform cata-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
									>
										<MenuItem>
											<Link 
												href={"/profile/" + userData.username}
												className="block px-4 py-2 text-sm text-violet-950 dark:text-violet-100 data-focus:bg-gray-100 dark:data-focus:bg-slate-700 data-focus:outline-hidden"
											>
												Your Profile
											</Link>
										</MenuItem>
										<MenuItem>
											<form action={async () => {
												"use server";
												await signOut({ redirectTo: '/' });
											}}>
												<button type="submit" className="w-full block px-4 py-2 text-left text-sm text-violet-950 dark:text-violet-100 hover:bg-gray-100 dark:hover:bg-slate-700 hover:outline-hidden cursor-pointer">
													Sign out
												</button>
											</form>
										</MenuItem>
									</MenuItems>
								</Menu>
							</div>
							:
							<></>
						}
                    </div>
                </div>

				<DisclosurePanel className="sm:hidden">
					<div className="text-lg font-bold space-y-1 px-2 pt-2 pb-3">
						{pages.map((page) => (
							<DropdownNavLink key={page.name} href={page.href} className="block rounded-xl p-2">{page.name}</DropdownNavLink>
                        ))}
					</div>
				</DisclosurePanel>
            </Disclosure>
        </header>
    );
}
"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { DropdownNavLink } from "../nav-link";
import { useState } from "react";

export default function MobileMenu({ pages }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="sm:hidden">
			<button
				onClick={() => setIsOpen(prev => !prev)}
				className="group relative inline-flex items-center justify-center rounded-md p-2 text-violet-950 hover:bg-violet-700 hover:text-violet-100 dark:text-violet-100"
			>
				<span className="sr-only">Open main menu</span>
				{isOpen ? (
					<XMarkIcon className="size-7" />
				) : (
					<Bars3Icon className="size-7" />
				)}
			</button>
			{isOpen && (
				<div className="space-y-1 px-2 pt-2 pb-3 text-lg font-bold">
					{pages.map(page => (
						<DropdownNavLink
							key={page.name}
							href={page.href}
							className="block rounded-xl p-2"
						>
							{page.name}
						</DropdownNavLink>
					))}
				</div>
			)}
		</div>
	);
}

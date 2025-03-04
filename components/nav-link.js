"use client";

import { DisclosureButton } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ className, href, children }) {
	const path = usePathname();

	return (
		<Link
			href={href}
			className={
				path.startsWith(href)
					? `bg-violet-600 text-violet-50 hover:bg-violet-800 ${className}`
					: `text-violet-950 hover:text-violet-500 dark:text-violet-100 ${className}`
			}
		>
			{children}
		</Link>
	);
}

export function DropdownNavLink({ className, href, children }) {
	const path = usePathname();

	return (
		<DisclosureButton
			as="a"
			href={href}
			className={
				path.startsWith(href)
					? `bg-violet-600 text-violet-50 hover:bg-violet-800 ${className}`
					: `text-violet-950 hover:text-violet-500 dark:text-violet-100 ${className}`
			}
		>
			{children}
		</DisclosureButton>
	);
}

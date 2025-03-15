"use client";

import { userSignOut } from "@/action/oauth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function UserMenu({ userData }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(prev => !prev)}
				className="relative ms-5 flex cursor-pointer rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
			>
				<span className="sr-only">Open user menu</span>
				<Image
					alt="Profile picture"
					src={userData.imageUrl}
					className="size-11 rounded-full"
					height={300}
					width={300}
					priority
				/>
			</button>
			{isOpen && (
				<div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 dark:bg-slate-500">
					<Link
						href={`/profile/${userData.username}`}
						className="block px-4 py-2 text-sm text-violet-950 hover:bg-gray-100 dark:text-violet-100 dark:hover:bg-slate-700"
					>
						Your profile
					</Link>
					<form action={userSignOut}>
						<button
							type="submit"
							className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-violet-950 hover:bg-gray-100 dark:text-violet-100 dark:hover:bg-slate-700"
						>
							Sign out
						</button>
					</form>
				</div>
			)}
		</div>
	);
}

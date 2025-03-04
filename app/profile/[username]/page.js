import { getSession } from "@/lib/get-session";
import { User } from "@/models/user";
import { notFound } from "next/navigation";
import Image from "next/image";
import connectDB from "@/lib/db";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import SocialLinks from "@/components/social-links";
import BookChamber from "@/components/book/book-chamber";
import AddBookButton from "@/components/book/buttons/add-book-button";

export default async function ProfilePage({ params }) {
	const { username } = await params;
	await connectDB();

	const [profileData, session] = await Promise.all([
		User.findOne({ username }),
		getSession()
	]);

	if (!profileData) notFound();

	const isUserProfile = session?.user
		? (await User.findOne({ email: session.user.email }))?.username ===
			username
		: false;

	return (
		<div className="mx-auto mt-7 grid max-w-lg grid-cols-1 gap-7 lg:max-w-5xl lg:grid-cols-3">
			<div className="space-y-5 rounded-md bg-white p-6 shadow-md dark:bg-slate-900">
				<Image
					src={profileData.imageUrl}
					alt="Profile picture"
					className="mx-auto size-44 rounded-full outline-5 outline-violet-800"
					width={300}
					height={300}
					priority
				/>
			</div>
			<div className="rounded-md bg-white p-6 shadow-md lg:col-span-2 dark:bg-slate-900">
				<div className="flex flex-wrap justify-between">
					<div>
						<h1 className="text-4xl font-bold text-violet-950 dark:text-violet-100">
							{profileData.firstName} {profileData.lastName}
						</h1>
						<p className="text-lg font-semibold text-violet-800 dark:text-violet-300">
							{profileData.username}
						</p>
					</div>
					{isUserProfile && (
						<div className="self-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 hover:shadow-xs">
							<Link
								href={`/profile/${username}/edit`}
								className="block rounded-md px-3 py-2 font-semibold"
							>
								<span className="sr-only">Edit Profile</span>
								<PencilSquareIcon className="size-8" />
							</Link>
						</div>
					)}
				</div>
				<p className="mt-2 whitespace-pre-line text-violet-950 dark:text-violet-100">
					{profileData.bio}
				</p>
				<SocialLinks
					profileData={JSON.parse(JSON.stringify(profileData))}
				/>
			</div>
			<div className="col-span-full mb-10 rounded-md bg-white p-6 shadow-md dark:bg-slate-900">
				<div className="relative flex items-center justify-center">
					<h1 className="text-center text-3xl font-semibold text-violet-950 dark:text-violet-100">
						{profileData.firstName}'s Book Chamber
					</h1>
					{isUserProfile && (
						<div className="absolute right-5 hidden lg:block">
							<span className="sr-only">
								Add a book to your profile
							</span>
							<AddBookButton />
						</div>
					)}
				</div>

				<div className="mt-4 flex justify-center lg:hidden">
					<AddBookButton />
				</div>

				<BookChamber
					userData={JSON.parse(JSON.stringify(profileData))}
				/>
			</div>
		</div>
	);
}

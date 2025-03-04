import { updateUserProfile, updateUserSocials } from "@/action/update-profile";
import EditProfileForm from "@/components/forms/profile/edit-profile-form";
import EditSocialsForm from "@/components/forms/profile/edit-socials-form";
import connectDB from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { User } from "@/models/user";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function EditProfilePage({ params }) {
	const { username } = await params;
	await connectDB();

	const [profileData, session] = await Promise.all([
		User.findOne({ username }),
		getSession()
	]);

	if (!profileData) notFound();

	const user = session?.user;
	if (!user) redirect("/login");

	const userData = await User.findOne({ email: user.email });
	if (userData?.username !== username) redirect(`/profile/${username}`);

	return (
		<div className="mx-auto my-7 w-full rounded-md bg-white p-6 shadow-xs lg:w-5xl dark:bg-slate-900">
			<Link
				href={`/profile/${username}`}
				className="mb-10 block rounded-md bg-violet-500 px-3 py-2 text-center font-semibold text-violet-100 hover:bg-violet-600 sm:absolute sm:mb-0 sm:text-left"
			>
				&larr; Back
			</Link>
			<h1 className="text-center text-4xl font-bold text-violet-950 dark:text-violet-100">
				Edit Profile
			</h1>
			<EditProfileForm
				action={updateUserProfile}
				userData={JSON.parse(JSON.stringify(userData))}
			/>
			<h1 className="mt-4 text-center text-3xl font-semibold text-violet-950 dark:text-violet-100">
				Edit Socials
			</h1>
			<EditSocialsForm
				action={updateUserSocials}
				userData={JSON.parse(JSON.stringify(userData))}
			/>
		</div>
	);
}

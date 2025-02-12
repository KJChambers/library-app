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
    if (!user) redirect('/login');

    const userData = await User.findOne({ email: user.email });
    if (userData?.username !== username) redirect(`/profile/${username}`);

    return (
        <div className="p-6 my-7 mx-auto w-full lg:w-5xl rounded-md shadow-xs bg-white dark:bg-slate-900">
            <Link
                href={`/profile/${username}`}
                className="block mb-10 text-center sm:text-left sm:mb-0 sm:absolute font-semibold px-3 py-2 rounded-md bg-violet-500 hover:bg-violet-600 text-violet-100"
            >
                &larr; Back
            </Link>
            <h1 className="text-center font-bold text-4xl text-violet-950 dark:text-violet-100">Edit Profile</h1>
            <EditProfileForm action={updateUserProfile} userData={JSON.parse(JSON.stringify(userData))} />
            <h1 className="text-center font-semibold text-3xl text-violet-950 dark:text-violet-100 mt-4">Edit Socials</h1>
            <EditSocialsForm action={updateUserSocials} userData={JSON.parse(JSON.stringify(userData))} />
        </div>
    );
}
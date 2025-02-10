import { getSession } from "@/lib/get-session";
import { User } from "@/models/user";
import { notFound } from "next/navigation";
import pfp from "@/public/obi-wan.jpg";
import Image from "next/image";

export default async function ProfilePage({ params }) {
    const { username } = await params;
    const profileData = await User.findOne({ username });

    if (!profileData) {
        notFound();
    }

    const session = await getSession();
    const user = session?.user;
    let isUserProfile = false;

    if (user) {
        const userData = await User.findOne({ email: user.email });
        if (userData.username === username) {
            isUserProfile = true;
        }
    }

    return (
        <div className="mt-7 mx-auto max-w-lg grid grid-cols-1 lg:grid-cols-3 lg:max-w-5xl gap-7">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md shadow-md space-y-5">
                <Image 
                    src={pfp}
                    alt="Profile picture"
                    className="rounded-full outline-5 outline-violet-800 size-44 mx-auto"
                    priority={true}
                />
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md shadow-md lg:col-span-2">
                <h1 className="font-bold text-violet-950 dark:text-violet-100 text-4xl">{profileData.firstName} {profileData.lastName}</h1>
                <p className="font-semibold text-violet-800 dark:text-violet-100 text-lg">{profileData.username}</p>
                <p className="text-violet-950 dark:text-violet-100 mt-2">{profileData.bio}</p>
            </div>
        </div>
    );
}
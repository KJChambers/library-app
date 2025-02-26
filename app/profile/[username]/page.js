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
        ? (await User.findOne({email: session.user.email }))?.username === username
        : false;

    return (
        <div className="mt-7 mx-auto max-w-lg grid grid-cols-1 lg:grid-cols-3 lg:max-w-5xl gap-7">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md shadow-md space-y-5">
                <Image 
                    src={profileData.imageUrl}
                    alt="Profile picture"
                    className="rounded-full outline-5 outline-violet-800 size-44 mx-auto"
                    width={300}
                    height={300}
                    priority
                />
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md shadow-md lg:col-span-2">
                <div className="flex flex-wrap justify-between">
                    <div>
                        <h1 className="font-bold text-violet-950 dark:text-violet-100 text-4xl">{profileData.firstName} {profileData.lastName}</h1>
                        <p className="font-semibold text-violet-800 dark:text-violet-300 text-lg">{profileData.username}</p>
                    </div>
                    {isUserProfile &&
                        <div className="self-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 hover:shadow-xs">
                            <Link
                                href={`/profile/${username}/edit`}
                                className="rounded-md font-semibold block px-3 py-2"
                            >   
                                <span className="sr-only">Edit Profile</span>
                                <PencilSquareIcon className="size-8" />
                            </Link>
                        </div>
                    }
                </div>
                <p className="text-violet-950 dark:text-violet-100 mt-2 whitespace-pre-line">{profileData.bio}</p>
                <SocialLinks profileData={JSON.parse(JSON.stringify(profileData))} />
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md shadow-md col-span-full mb-10">
                <div className="flex justify-center items-center relative">
                    <h1 className="font-semibold text-violet-950 dark:text-violet-100 text-center text-3xl">{profileData.firstName}'s Book Chamber</h1>
                    { isUserProfile &&
                        <div className="absolute right-5 hidden lg:block">
                            <span className="sr-only">Add a book to your profile</span>
                            <AddBookButton />
                        </div>
                    }
                </div>

                <div className="flex lg:hidden mt-4 justify-center">
                    <AddBookButton />
                </div>

                <BookChamber userData={JSON.parse(JSON.stringify(profileData))} />
            </div>
        </div>
    );
}
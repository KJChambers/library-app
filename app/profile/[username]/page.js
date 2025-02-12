import { getSession } from "@/lib/get-session";
import { User } from "@/models/user";
import { notFound } from "next/navigation";
import pfp from "@/public/obi-wan.jpg";
import Image from "next/image";
import connectDB from "@/lib/db";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { FaFacebookSquare, FaGithubSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

export default async function ProfilePage({ params }) {
    const { username } = await params;
    await connectDB();
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
                <div className="flex flex-wrap justify-between">
                    <div>
                        <h1 className="font-bold text-violet-950 dark:text-violet-100 text-4xl">{profileData.firstName} {profileData.lastName}</h1>
                        <p className="font-semibold text-violet-800 dark:text-violet-100 text-lg">{profileData.username}</p>
                    </div>
                    {isUserProfile ?
                        <div className="self-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 hover:shadow-xs">
                            <Link
                                href={`/profile/${username}/edit`}
                                className="rounded-md font-semibold block px-3 py-2"
                            >   
                                <span className="sr-only">Edit Profile</span>
                                <PencilSquareIcon className="size-8" />
                            </Link>
                        </div> :
                        <></>
                    }
                </div>
                <p className="text-violet-950 dark:text-violet-100 mt-2 whitespace-pre-line">{profileData.bio}</p>
                <div className="mt-2 flex flex-wrap items-center">
                    {profileData.socials.facebook &&
                        <div className="text-blue-600 hover:text-blue-500">
                            <a
                                href={profileData.socials.facebook}
                                target="_blank"
                                className="block p-2"
                            >
                                <FaFacebookSquare className="size-6" />
                            </a>
                        </div>
                    }
                    {profileData.socials.linkedin &&
                        <div className="text-sky-600 hover:text-sky-500">
                            <a
                                href={profileData.socials.linkedin}
                                target="_blank"
                                className="block p-2"
                            >
                                <FaLinkedin className="size-6" />
                            </a>
                        </div>
                    }
                    {profileData.socials.instagram &&
                        <div className="text-fuchsia-600 hover:text-fuchsia-500">
                            <a
                                href={profileData.socials.instagram}
                                target="_blank"
                                className="block p-2"
                            >
                                <FaInstagramSquare className="size-6" />
                            </a>
                        </div>
                    }
                    {profileData.socials.github &&
                        <div className="text-slate-800 hover:text-slate-600">
                            <a
                                href={profileData.socials.github}
                                target="_blank"
                                className="block p-2"
                            >
                                <FaGithubSquare className="size-6" />
                            </a>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
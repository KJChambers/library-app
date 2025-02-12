'use client';

import { useActionState } from "react";
import EditProfileFormSubmit from "./edit-profile-form-submit";

export default function EditSocialsForm({ action, userData }) {
    const [state, formAction] = useActionState(action, {});

    return (
        <form action={formAction} className="space-y-12 px-0 sm:px-44 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <input type="hidden" id="socialsemail" name="socialsemail" defaultValue={userData.email} />
                <div className="sm:col-span-full md:col-span-5 lg:col-span-4">
                    <label htmlFor="facebook" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100">
                        Facebook
                    </label>
                    <div className="mt-2">
                        <input
                            id="facebook"
                            name="facebook"
                            type="text"
                            placeholder={(state.payload?.get("facebook") || userData.socials.facebook)}
                            defaultValue={(state.payload?.get("facebook") || userData.socials.facebook)}
                            className="block w-full rounded-md bg-slate-100 dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-full md:col-span-5 lg:col-span-4">
                    <label htmlFor="linkedin" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100">
                        Linkedin
                    </label>
                    <div className="mt-2">
                        <input
                            id="linkedin"
                            name="linkedin"
                            type="text"
                            placeholder={(state.payload?.get("linkedin") || userData.socials.linkedin)}
                            defaultValue={(state.payload?.get("linkedin") || userData.socials.linkedin)}
                            className="block w-full rounded-md bg-slate-100 dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-full md:col-span-5 lg:col-span-4">
                    <label htmlFor="instagram" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100">
                        Instagram
                    </label>
                    <div className="mt-2">
                        <input
                            id="instagram"
                            name="instagram"
                            type="text"
                            placeholder={(state.payload?.get("instagram") || userData.socials.instagram)}
                            defaultValue={(state.payload?.get("instagram") || userData.socials.instagram)}
                            className="block w-full rounded-md bg-slate-100 dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-full md:col-span-5 lg:col-span-4">
                    <label htmlFor="github" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100">
                        GitHub
                    </label>
                    <div className="mt-2">
                        <input
                            id="github"
                            name="github"
                            type="text"
                            placeholder={(state.payload?.get("github") || userData.socials.github)}
                            defaultValue={(state.payload?.get("github") || userData.socials.github)}
                            className="block w-full rounded-md bg-slate-100 dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    {state.errors && (
                        <ul className="text-red-500">
                            {state.errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
                
                <div className="col-span-full">
                    <EditProfileFormSubmit />
                </div>
            </div>
        </form>
    );
}
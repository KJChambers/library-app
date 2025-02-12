'use client';

import { useActionState, useState } from "react";
import EditProfileFormSubmit from "./edit-profile-form-submit";

export default function EditProfileForm({ action, userData }) {
    const [state, formAction] = useActionState(action, {});
    const [bio, setBio] = useState(userData.bio);

    return (
        <form action={formAction} className="space-y-12 px-0 sm:px-44 pb-12 border-b border-gray-900/20 dark:border-gray-400/50">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <input type="hidden" id="email" name="email" defaultValue={userData.email} />
                <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*']">
                        First name
                    </label>
                    <div className="mt-2">
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            placeholder={(state.payload?.get("firstName") || userData.firstName)}
                            defaultValue={(state.payload?.get("firstName") || userData.firstName)}
                            className="block w-full rounded-md bg-slate-100 dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Last name
                    </label>
                    <div className="mt-2">
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            placeholder={(state.payload?.get("lastName") || userData.lastName)}
                            defaultValue={(state.payload?.get("lastName") || userData.lastName)}
                            className="block w-full rounded-md bg-slate-100 dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label htmlFor="username" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder={(state.payload?.get("username") || userData.username)}
                            defaultValue={(state.payload?.get("username") || userData.username)}
                            className="block w-full rounded-md bg-slate-100 dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <label htmlFor="bio" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100">
                        Bio
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="bio"
                            name="bio"
                            rows={2}
                            maxLength={120}
                            minLength={10}
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            className="block w-full rounded-md bg-slate-100 dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                        />
                    </div>
                    <p className="text-end text-gray-600 dark:text-gray-400/80 text-sm/6">{bio.length}/120 characters used</p>
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
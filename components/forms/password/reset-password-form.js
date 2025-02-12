'use client';

import { useActionState } from "react"
import { useFormStatus } from "react-dom";

export default function ResetPasswordForm({ action, email }) {
    const [state, formAction] = useActionState(action, {});
    const status = useFormStatus();

    return (
        <form action={formAction} className="space-y-6">
            <input type="hidden" id="email" name="email" defaultValue={email.email} />
            <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*']">
                    New password
                </label>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        placeholder="*********"
                        defaultValue={(state.payload?.get("password") || "")}
                        className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="password2" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*']">
                    Repeat password
                </label>
                <div className="mt-2">
                    <input
                        id="password2"
                        name="password2"
                        type="password"
                        autoComplete="password"
                        placeholder="*********"
                        defaultValue={(state.payload?.get("password2") || "")}
                        className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                    />
                </div>
            </div>
            <div>
                {state.errors && (
					<ul className="text-red-500">
						{state.errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				)}
            </div>
            <div>
                {!status.pending ?
                    <button
                        type="submit"
                        className="cursor-pointer flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                    >
                        Reset Password
                    </button>
                    : <span>Resetting...</span>
                }
            </div>
        </form>
    )
}
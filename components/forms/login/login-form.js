'use client';

import Link from "next/link";
import { useActionState } from "react";
import LoginFormSubmit from "./login-form-submit";

export default function LoginForm({ action }) {
    const [state, formAction] = useActionState(action, {});

    return (
        <form action={formAction} className="space-y-6">
            
            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*']">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="example@gmail.com"
                        defaultValue={(state.payload?.get("email") || "")}
                        className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-violet-950 dark:text-violet-100 after:ml-0.5 after:text-red-500 after:content-['*']">
                        Password
                    </label>
                    <div className="text-sm">
                        <Link href="/login/forgot" className="font-semibold text-violet-600 dark:text-violet-500 hover:text-violet-500 dark:hover:text-violet-600">Forgot password?</Link>
                    </div>
                </div>
                <div className="mt-2">
                    <input 
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="********"
                        defaultValue={(state.payload?.get("password") || "")}
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
                <LoginFormSubmit />
            </div>
        </form>
    );
}
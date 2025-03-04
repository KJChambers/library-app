"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function ForgotPasswordForm({ action }) {
	const [state, formAction] = useActionState(action, {});
	const status = useFormStatus();

	return (
		<form action={formAction} className="space-y-6">
			<div>
				{state.success && (
					<div className="w-full rounded-md bg-green-200 p-3 text-center">
						<p className="text-green-700">
							Email sent - check your inbox and spam!
						</p>
					</div>
				)}
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm/6 font-medium text-violet-950 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-violet-100"
				>
					Email address
				</label>
				<div className="mt-2">
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						placeholder="example@gmail.com"
						defaultValue={state.payload?.get("email") || ""}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-violet-950 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 dark:bg-slate-500 dark:text-violet-100 dark:placeholder:text-violet-100/50 dark:focus:outline-violet-400"
					/>
				</div>
			</div>
			<div>
				{state.errors && (
					<ul className="text-red-500">
						{state.errors.map(error => (
							<li key={error}>{error}</li>
						))}
					</ul>
				)}
			</div>
			<div>
				{!status.pending ? (
					<button
						type="submit"
						className="flex w-full cursor-pointer justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
					>
						Send Reset Link
					</button>
				) : (
					<span>Sending...</span>
				)}
			</div>
		</form>
	);
}

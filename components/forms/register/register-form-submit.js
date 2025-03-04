"use client";

import { useFormStatus } from "react-dom";

export default function RegisterFormSubmit() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className="flex w-full cursor-pointer justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:bg-gray-50 disabled:text-gray-500"
			aria-disabled={pending}
			disabled={pending}
		>
			{pending ? "Creating account..." : "Register"}
		</button>
	);
}

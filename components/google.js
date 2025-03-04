import { GoogleSignIn } from "@/action/oauth";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
	return (
		<form action={GoogleSignIn}>
			<button
				type="submit"
				className="mb-4 flex w-full cursor-pointer items-center justify-center gap-5 rounded-md bg-white p-3 font-bold text-violet-950 outline-2 outline-gray-300 hover:bg-gray-100 hover:outline-2 hover:outline-violet-600 dark:bg-slate-400 dark:text-violet-100 dark:outline-gray-600 dark:hover:bg-slate-500 dark:hover:outline-violet-400"
			>
				<FcGoogle className="size-7" /> Sign in with Google
			</button>
		</form>
	);
}

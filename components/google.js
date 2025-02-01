import GoogleSignIn from "@/action/google";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
    return (
        <form
            action={GoogleSignIn}
        >
            <button type="submit" className="font-bold flex w-full cursor-pointer text-violet-950 dark:text-violet-100 bg-white dark:bg-slate-400 hover:bg-gray-100 dark:hover:bg-slate-500 outline-2 outline-gray-300 dark:outline-gray-600 hover:outline-2 hover:outline-violet-600 dark:hover:outline-violet-400 rounded-md p-3 mb-4 items-center justify-center gap-5"><FcGoogle className="size-7" /> Sign in with Google</button>
        </form>
    )
}
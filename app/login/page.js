import { login } from "@/action/user";
import Link from "next/link";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import LoginForm from "@/components/login-form";
import GoogleButton from "@/components/google";

export default async function LoginPage() {
    const session = await getSession();
    const user = session?.user;
    if (user) redirect("/dashboard");

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <BookmarkIcon aria-hidden="true" className="text-violet-950 dark:text-violet-100 size-7 mx-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-violet-950 dark:text-violet-100">
                    Login
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <GoogleButton />
                <div className="flex items-center text-gray-400 dark:text-slate-600 mb-3 before:flex-1 before:content-[''] before:p-0.5 before:rounded-full before:bg-gray-300 dark:before:bg-slate-600 before:m-1.5 before:mb-0 after:flex-1 after:content-[''] after:p-0.5 after:rounded-full after:bg-gray-300 dark:after:bg-slate-600 after:m-1.5 after:mb-0">or</div>
                <LoginForm action={login} />

                <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-violet-600 dark:text-violet-500 hover:text-violet-500 dark:hover:text-violet-600">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
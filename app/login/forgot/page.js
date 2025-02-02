import { forgotPassword } from "@/action/user";
import ForgotPasswordForm from "@/components/forms/forgot-password-form";
import { getSession } from "@/lib/get-session";
import { BookmarkIcon } from "@heroicons/react/24/outline";

export default async function ForgotPasswordPage() {
    const session = await getSession();
    const user = session?.user;
    if (user) redirect("/dashboard");

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <BookmarkIcon aria-hidden="true" className="text-violet-950 dark:text-violet-100 size-7 mx-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-violet-950 dark:text-violet-100">
                    Reset Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <ForgotPasswordForm action={forgotPassword} />
            </div>
        </div>
    );
}
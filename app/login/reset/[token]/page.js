import jwt from 'jsonwebtoken';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { User } from '@/models/user';
import ResetPasswordForm from '@/components/forms/password/reset-password-form';
import { resetPassword } from '@/action/user';

export default async function PasswordResetPage({ params }) {
    const { token } = await params;
    try {
        const email = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = User.findOne({ email });

        if (!user) {
            return (
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-violet-950 dark:text-violet-100">User not found with your email.</h2>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <BookmarkIcon aria-hidden="true" className="text-violet-950 dark:text-violet-100 size-7 mx-auto" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-violet-950 dark:text-violet-100">
                        Reset Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <ResetPasswordForm action={resetPassword} email={email} />
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-violet-950 dark:text-violet-100">Invalid Reset Token</h2>
                </div>
            </div>
        );
    }
}
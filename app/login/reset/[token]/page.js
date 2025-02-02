import jwt from 'jsonwebtoken';
import { BookmarkIcon } from '@heroicons/react/24/outline';

export default async function PasswordResetPage({ params }) {
    const { token } = await params;
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if (err) {
            return <h1>Invalid Token</h1>
        } else {
            return (
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <BookmarkIcon aria-hidden="true" className="text-violet-950 dark:text-violet-100 size-7 mx-auto" />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-violet-950 dark:text-violet-100">
                            Reset Password
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        
                    </div>
                </div>
            );
        }
    });
}
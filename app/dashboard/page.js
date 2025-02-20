import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getSession();
    const user = session?.user;
    if (!user) redirect('/login');

    return (
        <div className="p-6 my-7 mx-auto w-full md:w-2xl lg:w-5xl rounded-md shadow-xs bg-white dark:bg-slate-900 text-violet-950 dark:text-violet-100">
            <h1 className="text-center font-bold text-4xl pb-5">Dashboard</h1>
            <p className="text-center font-semibold">This page is temporary - start by clicking the picture in the top-right and selecting your profile!</p>
        </div>
    );
}
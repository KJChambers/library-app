import connectDB from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { User } from "@/models/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getSession();
    const user = session?.user;
    if (!user) redirect('/login');
    await connectDB();
    const userData = await User.findOne({ email: user.email });

    return (
        <>
            <h1>Dashboard</h1>
            <p>{userData.email}</p>
            <p>{userData.firstName + ' ' + userData.lastName}</p>
            <p>{userData.username}</p>
        </>
    );
}
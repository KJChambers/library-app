import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getSession();
    const user = session?.user;
    if (!user) redirect('/login');

    return (
        <h1>Dashboard</h1>
    );
}
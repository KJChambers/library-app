import connectDB from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { User } from "@/models/user";
import { redirect } from "next/navigation";

export default async function ProfileRedirectPage() {
	const session = await getSession();
	if (!session?.user) redirect("/login");
	await connectDB();
	const user = await User.findOne({ email: session.user.email });
	redirect(`/profile/${user.username}`);
}

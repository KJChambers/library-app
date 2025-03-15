import { getUniqueUser } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function ProfileRedirectPage() {
	const session = await getSession();
	if (!session?.user) redirect("/login");
	const user = await getUniqueUser("email", session?.user.email);
	redirect(`/profile/${user.username}`);
}

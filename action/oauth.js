"use server";

import { signIn, signOut } from "@/lib/auth";

export async function GoogleSignIn() {
	await signIn("google");
}

export async function userSignOut() {
	await signOut({ redirectTo: "/" });
}
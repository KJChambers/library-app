'use server';

import { signIn } from "@/lib/auth";

export async function GoogleSignIn() {
    await signIn("google");
}
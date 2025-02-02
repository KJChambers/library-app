'use server';

import { signIn } from "@/lib/auth";

export default async function GoogleSignIn() {
    await signIn("google");
}
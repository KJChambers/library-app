'use server';

import { User } from "@/models/user";
import connectDB from "@/lib/db";
import { compare } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function login(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    let errors = [];

    if (!email || email.trim().length === 0 || !email.includes('@')) {
        errors.push("Please enter a valid email.");
    }

    if (!password || password.trim().length === 0) {
        errors.push("Password is required.");
    }

    if (password.length < 8 || password.length > 15) {
        errors.push("Password must be 8-16 characters.");
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
         };
    }

    await connectDB();

    const user = await User.findOne({ email }).select("+password +role");

    if(!user || !user.password ) {
        errors.push("Invalid email or password.")
    }

    const isMatched = await compare(password, user.password);

    if (!isMatched) {
        errors.push("Invalid password.")
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }

    try {
        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email,
            password
        });
    } catch (error) {
        if (error instanceof CredentialsSignin ) {
            errors.push(error.cause);
        }
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    } else {
        redirect("/dashboard");
    }
}
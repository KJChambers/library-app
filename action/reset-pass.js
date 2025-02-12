'use server';

import connectDB from "@/lib/db";
import { User } from "@/models/user";
import { redirect } from "next/navigation";
import { compare, hash } from "bcryptjs";
import { Resend } from "resend";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default async function resetPassword(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    let errors = [];

    if (!password || !password2) {
        errors.push("Please enter a new password.");
    }

    if (password !== password2) {
        errors.push("Passwords do not match.");
    }

    if (password.length < 8 || password.length > 16) {
        errors.push("Password must be 8-16 characters.");
    }

    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,}$/
    if (!pattern.test(password)) {
        errors.push("Password must include a number, an uppercase letter and a lowercase letter.");
    }

    pattern = /^[a-zA-Z0-9!@#$^&*]+$/
    if (!pattern.test(password)) {
        errors.push("Accepted password special characters: ! @ # $ ^ & *");
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }

    await connectDB();
    const user = await User.findOne({ email }).select("+password");
    const isMatch = await compare(password, user.password);

    if (isMatch) {
        errors.push("Password must not be the same as your old password.");
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }

    const resend = new Resend(process.env.RESEND_KEY);

    try {

        user.password = await hash(password, 12);
        await user.save();

        const { data, error } = await resend.emails.send({
            from: 'The Book Chamber <no-reply@book-chamber.com>',
            to: [user.email],
            subject: 'Password Changed',
            react: <>
                <h1>Hello, {user.firstName}!</h1>
                <p>Your password has been successfully changed! If you didn't request this change, immediately contact kieranc0808@gmail.com</p>
                <br />
                <small>This is not part of a subscriber list.</small>
            </>
        });

        if (error) {
            errors.push(error.message);
            return {
                errors,
                payload: formData
            };
        }

        redirect("/login");

    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        errors.push(error.message);
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }
}
'use server';

import connectDB from "@/lib/db";
import { User } from "@/models/user";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/lib/auth";
import { compare, hash } from "bcryptjs";
import EmailTemplate from "@/components/forgot-email-template";
import { Resend } from "resend";
import { isRedirectError } from "next/dist/client/components/redirect-error";

async function login(prevState, formData) {
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

async function register(prevState, formData) {
    const firstName = formData.get("firstname").trim();
    const lastName = formData.get("lastname").trim();
    const username = formData.get("username").trim().toLowerCase();
    const email = formData.get("email").trim().toLowerCase();
    const password = formData.get("password").trim();

    let errors = [];

    if (!firstName || !lastName || !username || !email || !password) {
        errors.push("Please fill in all fields.");
    }

    if (username.length < 4 || username.length > 16) {
        errors.push("Username must be 4-16 characters.");
    }

    let pattern = /^[a-z0-9._]+$/;
    if (!pattern.test(username)) {
        errors.push("Username can only contain letters, numbers, dots or underscores.");
    }

    if (username.startsWith('.') || username.startsWith('_')) {
        errors.push("Username cannot start with a dot or underscore.");
    }

    if (username.endsWith('.') || username.endsWith('_')) {
        errors.push("Username cannot end with a dot or underscore.");
    }

    if (!email.includes('@')) {
        errors.push("Please enter a valid email.");
    }

    if (password.length < 8 || password.length > 16) {
        errors.push("Password must be 8-16 characters.");
    }

    pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
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

    const existingUser = await User.findOne({ email });
    if (existingUser) errors.push("User exists with that email.");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) errors.push("Username taken.");

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }

    const hashedPassword = await hash(password, 12);

    await User.create({ firstName, lastName, username, email, password: hashedPassword });
    console.log('User created!');
    redirect("/login");
}

async function forgotPassword(prevState, formData) {
    const email = formData.get("email").toLowerCase();

    let errors = [];
    
    if (!email || email.trim().length === 0 || !email.includes('@')) {
        errors.push("Please enter a valid email.");
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }

    await connectDB();

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        errors.push("No user exists with this email.");
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }

    const resend = new Resend(process.env.RESEND_KEY);

    if (!(user.password)) {
        try {
            const { data, error } = await resend.emails.send({
                from: 'The Book Chamber <no-reply@book-chamber.com>',
                to: [user.email],
                subject: 'Password Reset',
                react: <>
                    <h1>Hello, {user.firstName}!</h1>
                    <p>You don't have a password stored in our database. This usually means you logged in with Google. If you are unable to login with Google, contact kieranc0808@gmail.com</p>
                    <br />
                    <small>If you did not request this email, you can ignore it. This is not part of a subscriber list.</small>
                </>
            });
    
            if (error) {
                errors.push(error);
                return { 
                    errors,
                    payload: formData
                };
            }
    
            return { 
                payload: formData,
                success: true
            };
        } catch (error) {
            errors.push(error);
        }
    
        if (errors.length > 0) {
            return { 
                errors,
                payload: formData
            };
        }
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'The Book Chamber <no-reply@book-chamber.com>',
            to: [user.email],
            subject: 'Password Reset',
            react: EmailTemplate({ firstName: user.firstName, email: user.email })
        });

        if (error) {
            errors.push(error);
            return { 
                errors,
                payload: formData
            };
        }

        return { 
            payload: formData,
            success: true
        };
    } catch (error) {
        errors.push(error);
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }
}

async function resetPassword(prevState, formData) {
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

async function updateUserProfile(prevState, formData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const username = formData.get("username");
    let bio = formData.get("bio");

    let errors = [];

    if (!firstName || !lastName || !username) {
        errors.push("Please enter all required details, marked with *.")
    }

    if (!bio) {
        bio = "";
    }

    if (username.length < 4 || username.length > 16) {
        errors.push("Username must be 4-16 characters.");
    }

    let pattern = /^[a-z0-9._]+$/;
    if (!pattern.test(username)) {
        errors.push("Username can only contain letters, numbers, dots or underscores.");
    }

    if (username.startsWith('.') || username.startsWith('_')) {
        errors.push("Username cannot start with a dot or underscore.");
    }

    if (username.endsWith('.') || username.endsWith('_')) {
        errors.push("Username cannot end with a dot or underscore.");
    }

    if (bio.length > 120) {
        errors.push("Bio must be under 120 characters.");
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }

    await connectDB();
    const user = await User.findOne({ email });

    if (
        user.username === username &&
        user.firstName === firstName &&
        user.lastName === lastName &&
        user.bio === bio
    ) {
        return {
            payload: formData
        };
    }

    try {
        if (user.firstName !== firstName) {
            user.firstName = firstName;
        }
        if (user.lastName !== lastName) {
            user.lastName = lastName;
        }
        if (user.username !== username) {
            user.username = username;
        }
        if (user.bio !== bio) {
            user.bio = bio;
        }
        await user.save();

        redirect(`/profile/${username}`);
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

async function updateUserSocials(prevState, formData) {
    const facebook = formData.get("facebook");
    const linkedin = formData.get("linkedin");
    const instagram = formData.get("instagram");
    const github = formData.get("github");
    const email = formData.get("socialsemail");

    let errors = [];

    if (facebook && !facebook.includes("facebook.com") && !facebook.includes("fb.com")) {
        errors.push("Invalid Facebook URL");
    }

    if (linkedin && !linkedin.includes("linkedin.com")) {
        errors.push("Invalid LinkedIn URL");
    }

    if (instagram && !instagram.includes("instagram.com")) {
        errors.push("Invalid Instagram URL");
    }

    if (github && !github.includes("github.com")) {
        errors.push("Invalid GitHub URL");
    }

    if (errors.length > 0) {
        return { 
            errors,
            payload: formData
        };
    }

    await connectDB();
    const user = await User.findOne({ email });

    if (
        user.socials.facebook === facebook &&
        user.socials.linkedin === linkedin &&
        user.socials.instagram === instagram &&
        user.socials.github === github
    ) {
        return {
            payload: formData
        }
    }

    try {
        if (user.socials.facebook !== facebook) {
            user.socials.facebook = facebook;
        }
        if (user.socials.linkedin !== linkedin) {
            user.socials.linkedin = linkedin;
        }
        if (user.socials.instagram !== instagram) {
            user.socials.instagram = instagram;
        }
        if (user.socials.github !== github) {
            user.socials.github = github;
        }
        user.save();

        redirect(`/profile/${user.username}`);
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

async function fetchAllUsers() {
    await connectDB();
    const users = await User.findOne({});
    return users;
}

export { register, login, forgotPassword, resetPassword, updateUserProfile, updateUserSocials, fetchAllUsers };
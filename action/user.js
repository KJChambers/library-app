'use server';

import connectDB from "@/lib/db";
import { User } from "@/models/user";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/lib/auth";
import { compare, hash } from "bcryptjs";
import EmailTemplate from "@/components/forgot-email-template";
import { Resend } from "resend";

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
    const email = formData.get("email").trim();
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
    const email = formData.get("email");

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

    const user = await User.findOne({ email });

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

    if (!user.password) {
        try {
            const { data, error } = await resend.emails.send({
                from: 'The Book Chamber <no-reply@book-chamber.com>',
                to: [user.email],
                subject: 'Password Reset',
                react: <>
                    <h1>Hello, {user.firstName}</h1>
                    <p>You don't have a password stored in our database. This usually means you logged in with Google. If you are unable to login with Google, contact kieranc0808@gmail.com</p>
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
            react: EmailTemplate({ firstName: user.firstName })
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

async function fetchAllUsers() {
    await connectDB();
    const users = await User.findOne({});
    return users;
}

export { register, login, forgotPassword, fetchAllUsers };
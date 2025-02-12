'use server';

import connectDB from "@/lib/db";
import { User } from "@/models/user";
import EmailTemplate from "@/components/forgot-email-template";
import { Resend } from "resend";

export default async function forgotPassword(prevState, formData) {
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
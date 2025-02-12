'use server';

import connectDB from "@/lib/db";
import { User } from "@/models/user";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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

export {updateUserProfile, updateUserSocials};
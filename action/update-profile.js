"use server";

import connectDB, { getUniqueUser } from "@/lib/db";
import { User } from "@/models/user";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { del, put } from "@vercel/blob";

async function updateUserProfile(prevState, formData) {
	const requiredFields = ["firstName", "lastName", "username"];
	const userData = Object.fromEntries(
		requiredFields.map(field => [field, formData.get(field).trim()])
	);
	userData.bio = formData.get("bio") || "";
	userData.email = formData.get("email");

	let errors = [];

	if (requiredFields.some(field => !userData[field])) {
		errors.push("Please enter all required details, marked with *.");
	}

	if (userData.username.length < 4 || userData.username.length > 16) {
		errors.push("Username must be 4-16 characters.");
	}

	const namePattern = /^[a-zA-Z]+$/;
	if (
		!namePattern.test(userData.firstName) ||
		!namePattern.test(userData.lastName)
	) {
		errors.push("Your first and last name cannot contain spaces.");
	}

	const usernamePattern = /^[a-z0-9._]+$/;
	if (!usernamePattern.test(userData.username)) {
		errors.push(
			"Username can only contain letters, numbers, dots or underscores."
		);
	}

	if (/^[._]|[._]$/.test(userData.username)) {
		errors.push("Username cannot start or end with a dot or underscore.");
	}

	if (userData.bio.length > 120) {
		errors.push("Bio must be under 120 characters.");
	}

	if (errors.length > 0) {
		return { errors, payload: formData };
	}

	await connectDB();
	const user = await User.findOne({ email: userData.email });

	const imageUrl = formData.get("profileImage");
	if (imageUrl !== user.imageUrl) {
		if (
			user.imageUrl !==
			"https://kdfty63zg3p3ls2v.public.blob.vercel-storage.com/avatar.jpg"
		)
			await del(user.imageUrl);
		const blob = await put(`profile.jpg`, imageUrl, { access: "public" });
		userData.imageUrl = blob.url;
	} else userData.imageUrl = user.imageUrl;

	if (
		requiredFields.every(field => user[field] === userData[field]) &&
		user.bio === userData.bio &&
		user.imageUrl === userData.imageUrl
	) {
		return { payload: formData };
	}

	if (user.username !== userData.username) {
		const existingUser = await User.findOne({
			username: userData.username
		});
		if (existingUser) {
			errors.push("Username is already taken.");
		}
	}

	if (errors.length > 0) {
		return { errors, payload: formData };
	}

	try {
		let updated = false;

		requiredFields.concat(["bio", "imageUrl"]).forEach(field => {
			if (user[field] !== userData[field]) {
				user[field] = userData[field];
				updated = true;
			}
		});

		if (updated) {
			await user.save();
			redirect(`/profile/${user.username}`);
		}
	} catch (error) {
		if (isRedirectError(error)) throw error;
		errors.push(error.message);
	}

	if (errors.length > 0) {
		return { errors, payload: formData };
	}
}

async function updateUserSocials(prevState, formData) {
	const email = formData.get("socialsemail");

	let errors = [];
	const socialPlatforms = {
		facebook: ["facebook.com", "fb.com"],
		linkedin: ["linkedin.com"],
		instagram: ["instagram.com"],
		github: ["github.com"]
	};

	Object.entries(socialPlatforms).forEach(([platform, validDomains]) => {
		const url = formData.get(platform);
		if (url) {
			if (!validDomains.some(domain => url.includes(domain))) {
				errors.push(
					`Invalid ${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`
				);
			}
			if (!url.startsWith("https://")) {
				errors.push(
					`Please ensure ${platform.charAt(0).toUpperCase() + platform.slice(1)} URL uses https://`
				);
			}
		}
	});

	if (errors.length > 0) {
		return { errors, payload: formData };
	}

	const user = await getUniqueUser("email", email);

	const socials = ["facebook", "linkedin", "instagram", "github"];

	if (
		socials.every(
			platform => user.socials[platform] === formData.get(platform)
		)
	) {
		return { payload: formData };
	}

	try {
		let updated = false;
		socials.forEach(platform => {
			const newValue = formData.get(platform);
			if (user.socials[platform] !== newValue) {
				user.socials[platform] = newValue;
				updated = true;
			}
		});

		if (updated) {
			user.save();
			redirect(`/profile/${user.username}`);
		}
	} catch (error) {
		if (isRedirectError(error)) throw error;
		errors.push(error.message);
	}

	if (errors.length > 0) {
		return { errors, payload: formData };
	}
}

export { updateUserProfile, updateUserSocials };

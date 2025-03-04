"use server";

import connectDB from "@/lib/db";
import { User } from "@/models/user";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";

export default async function register(prevState, formData) {
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
		errors.push(
			"Username can only contain letters, numbers, dots or underscores."
		);
	}

	if (username.startsWith(".") || username.startsWith("_")) {
		errors.push("Username cannot start with a dot or underscore.");
	}

	if (username.endsWith(".") || username.endsWith("_")) {
		errors.push("Username cannot end with a dot or underscore.");
	}

	if (!email.includes("@")) {
		errors.push("Please enter a valid email.");
	}

	if (password.length < 8 || password.length > 16) {
		errors.push("Password must be 8-16 characters.");
	}

	pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	if (!pattern.test(password)) {
		errors.push(
			"Password must include a number, an uppercase letter and a lowercase letter."
		);
	}

	pattern = /^[a-zA-Z0-9!@#$^&*]+$/;
	if (!pattern.test(password)) {
		errors.push("Accepted password special characters: ! @ # $ ^ & *");
	}

	if (errors.length > 0) {
		return { errors, payload: formData };
	}

	await connectDB();

	const existingUser = await User.findOne({ email });
	if (existingUser) errors.push("User exists with that email.");

	const existingUsername = await User.findOne({ username });
	if (existingUsername) errors.push("Username taken.");

	if (errors.length > 0) {
		return { errors, payload: formData };
	}

	const hashedPassword = await hash(password, 12);

	await User.create({
		firstName,
		lastName,
		username,
		email,
		password: hashedPassword
	});
	console.log("User created!");
	redirect("/login");
}

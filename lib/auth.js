import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectDB from "./db";
import { User } from "@/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			name: "Credentials",

			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},

			authorize: async credentials => {
				const { email } = credentials;

				await connectDB();

				const user = await User.findOne({ email });

				const userData = {
					firstName: user.firstName,
					lastName: user.lastName,
					username: user.username,
					email: user.email,
					id: user._id
				};

				return userData;
			}
		}),
		Google
	],

	pages: { signIn: "/login" },

	callbacks: {
		signIn: async ({ account, profile }) => {
			if (account?.provider === "google") {
				try {
					const { email, given_name, family_name, id } = profile;
					let { preferred_username } = profile;
					await connectDB();
					const alreadyUser = await User.findOne({ email });

					if (!alreadyUser) {
						let userInDB = await User.findOne({
							preferred_username
						});
						if (!preferred_username || userInDB) {
							let num = 1;
							let username =
								given_name.toLowerCase().at(0) +
								family_name.toLowerCase() +
								num;
							userInDB = await User.findOne({ username });
							while (userInDB) {
								num += 1;
								username =
									given_name.toLowerCase().at(0) +
									family_name.toLowerCase() +
									num;
								userInDB = await User.findOne({ username });
							}
							preferred_username = username;
						}

						await User.create({
							firstName: given_name,
							lastName: family_name,
							username: preferred_username,
							email,
							authProviderId: id
						});
						return true;
					} else {
						return true;
					}
				} catch (error) {
					console.log(error);
					throw new Error("Error while creating user");
				}
			}

			if (account?.provider === "credentials") {
				return true;
			} else {
				return false;
			}
		}
	}
});
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

            authorize: async (credentials) => {
                const { email } = credentials;

                await connectDB();

                const user = await User.findOne({ email }).select("+password +role");

                const userData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    id: user._id
                };

                return userData;
            }
        }),
        Google
    ],

    pages: {
        signIn: '/login'
    },

    callbacks: {
        async session({ session, token }) {
            if (token?.sub && token?.role) {
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },

        signIn: async ({ user, account }) => {
            if (account?.provider === "google") {
                try {
                    const { email, name, id } = user;
                    await connectDB();
                    const alreadyUser = await User.findOne({ email });

                    if (!alreadyUser) {
                        await User.create({ email, username: name, authProviderId: id });
                        return true;
                    } else {
                        return true;
                    }
                } catch (error) {
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
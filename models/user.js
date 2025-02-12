import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    imageUrl: String,
    bio: { type: String, default: "" },
    socials: {
        facebook: String,
        linkedin: String,
        instagram: String,
        github: String
    },
    authProviderId: String,
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
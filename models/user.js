import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    imageUrl: { type: String, default: "" },
    bio: { type: String, default: "" },
    socials: {
        facebook: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        instagram: { type: String, default: "" },
        github: { type: String, default: "" }
    },
    saved_books: [{
        bookId: String,
        read: Boolean,
        date_started: String,
        date_completed: String
    }],
    authProviderId: String,
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
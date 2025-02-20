import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: String,
    desc: { type: String, required: true },
    categories: [ String ],
    publisher: String,
    pub_date: String,
    ISBN: { type: String, required: true },
    pages: Number
});

export const Book = mongoose.models?.Book || mongoose.model("Book", bookSchema);
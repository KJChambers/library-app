// Use ECMAScript (ES) import syntax
import { getDatabase, ObjectId } from '../db.js';

async function createBook(bookData) {
    const db = await getDatabase();
    const booksCollection = db.collection('books');

    // Perform validation
    if (!bookData.title || !bookData.author) {
        throw new Error("Missing required book fields");
    }

    // Insert book into books collection
    const result = await booksCollection.insertOne(bookData);
    return result.insertedId;
}

async function getBookById(bookId) {
    const db = await getDatabase();
    const booksCollection = db.collection('books');

    const book = await booksCollection.findOne({ _id: ObjectId.createFromHexString(bookId) });
    return book;
}

export { createBook, getBookById };
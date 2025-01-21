// Use ECMAScript (ES) import syntax
import { getDatabase } from './db.js';

async function createUser(userData) {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    // Perform validation
    if (!userData.username || !userData.email || !userData.password_hash) {
        throw new Error("Missing required user fields");
    }

    // Insert user into users collection
    const result = await usersCollection.insertOne(userData);
    return result.insertedId; // Return the newly created user
}

async function getUserByUsername(username) {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username });
    return user;
}

async function getUserByEmail(email) {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });
    return user;
}

async function updateUserBooks(userId, bookData) {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    // Find user by ObjectId and update the books array
    const result = await usersCollection.updateOne(
        { _id: userId },
        { $push: { books: bookData } }
    );
    return result.modifiedCount;
}

async function getUserBooks(userId) {
    const db = await getDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ _id: userId });
    return user ? user.books : [];
}

export { createUser, getUserByUsername, getUserByEmail, updateUserBooks, getUserBooks };
// Use ECMAScript (ES) import syntax
import { getDatabase, closeDatabase } from '../db.js';
import { createUser, updateUserBooks } from '../models/user.js';
import { createBook } from '../models/book.js';

async function seedData() {
    const db = await getDatabase();

    try {
        // Clear existing data
        await db.collection('books').deleteMany({});
        await db.collection('users').deleteMany({});

        // Create sample books
        const book1 = await createBook({ title: "1984", author: "George Orwell", genre: "Dystopian" });
        const book2 = await createBook({ title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction" });

        // Create sample users
        const user1 = await createUser({ username: "alice", email: "alice@example.com", password_hash: "hashedpassword1" });
        const user2 = await createUser({ username: "bob", email: "bob@example.com", password_hash: "hashedpassword2" });

        // Update users with books
        await updateUserBooks(user1, { book_id: book1, is_read: true, start_date: new Date(), completion_date: new Date() });
        await updateUserBooks(user2, { book_id: book2, is_read: false, start_date: null, completion_date: null });

        console.log(`Sample data seeded successfully!`);
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        // Always close the connection using closeDatabase()
        await closeDatabase();
    }
}

seedData().catch(console.error);
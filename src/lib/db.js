// Use ECMAScript (ES) import syntax
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

let client = null;

// Function to connect to MongoDB
export async function getDatabase() {
    if (client) {
        return client.db("libraryDB");
    }
    
    try {
        // Create a MongoClient instance with connection options
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        await client.connect();
        await client.db("library").command({ ping: 1 });
        console.log("Set client... Pinged deployment... Successfully connected to MongoDB!");
        return client.db("libraryDB")
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

// Function to close the connection (only during app teardown)
export async function closeDatabase() {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed.");
        client = null; // Reset client object
    }
}
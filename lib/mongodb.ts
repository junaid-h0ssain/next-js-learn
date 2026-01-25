import mongoose from 'mongoose';

// Declare a global variable to cache the database connection
// This prevents multiple connections during hot reloads in development
// and ensures connection reuse in serverless environments
declare global {
    var mongoose: any; // This must be a `var` and not a `let / const`
}

// Get the MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGO_URI!;

// Validate that the MongoDB URI is provided
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Initialize the cached connection object
// This will store the connection and connection promise globally
let cached = global.mongoose;

if (!cached) {
    // Create a new cache object if it doesn't exist
    // conn: stores the actual mongoose connection
    // promise: stores the connection promise to prevent duplicate connection attempts
    cached = global.mongoose = { conn: null, promise: null };
}

// Main database connection function
async function dbConnect() {
    // Return the cached connection if it already exists
    if (cached.conn) {
        return cached.conn;
    }

    // If no connection promise exists, create one
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable mongoose buffering for better performance
        };

        // Create a connection promise and store it in the cache
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        // Wait for the connection promise to resolve and cache the connection
        cached.conn = await cached.promise;
    } catch (e) {
        // If connection fails, reset the promise so it can be retried
        cached.promise = null;
        throw e;
    }

    // Return the established connection
    return cached.conn;
}

export default dbConnect;

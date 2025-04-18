import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ This helps us get the folder path (like __dirname in older JS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ This tells dotenv to load the .env file from two folders up (the root)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectDB = async () => {
    console.log("📡 Attempting to connect to MongoDB...");
    console.log("🔐 MONGO_URI:", process.env.MONGO_URI); // Should print your actual URI

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Stop the app if the DB connection fails
    }
};

export default connectDB;

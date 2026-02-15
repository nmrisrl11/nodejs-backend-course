import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaNeon } from '@prisma/adapter-neon'

const connectionString = `${process.env.DATABASE_URL}`

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

const adapter = new PrismaNeon({ connectionString })

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter
});

const connectDB = async () => {
    try {
        await prisma.$connect();

        console.log("DB connected via Prisma");
    } catch (error) {
        console.log(`Database connection error: ${error.message}`);
        process.exit(1);
    }
}

const discconnectDB = async () => {
    await prisma.$disconnect();
}

export { connectDB, discconnectDB, prisma };


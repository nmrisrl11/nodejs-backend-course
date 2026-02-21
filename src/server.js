import { config } from "dotenv";
import express from "express";
import { connectDB, discconnectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

config();
connectDB();

const app = express();

app.use(express.json());
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

const PORT = 5001;

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

//! Handle unhandled promise rejections (e.g., Database connection errors)
process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection: ", error);

    server.close(async () => {
        await discconnectDB();
        process.exit(1);
    });
});

//! Handle uncaught exceptions
process.on("uncaughtException", async (error) => {
    console.error("Uncaught Exception: ", error);
    await discconnectDB();
    process.exit(1);
});

//! Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");

    server.close(async () => {
        await discconnectDB();
        process.exit(0);
    });
});
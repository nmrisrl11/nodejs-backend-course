import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
    try {
        const { movieId, status, rating, notes } = req.body;

        //! Verify if movie exists
        const movie = await prisma.movie.findUnique({ where: { id: movieId } })

        if (!movie) return res.status(404).json({
            error: "Movie not found"
        });

        //! Check if already added
        const existingInWatchlist = await prisma.watchlistItem.findUnique({
            where: {
                userId_movieId: {
                    userId: req.user.id,
                    movieId: movieId
                }
            }
        })

        if (existingInWatchlist) return res.status(400).json({
            error: "Movie already in the watchlist"
        });

        const watchlistItem = await prisma.watchlistItem.create({
            data: {
                userId: req.user.id,
                movieId,
                status: status || "PLANNED",
                rating,
                notes,
            }
        })

        res.status(201).json({
            status: "success",
            data: {
                watchlistItem
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const updateWatchlistItem = async (req, res) => {
    try {
        const { status, rating, notes } = req.body;

        const watchlistItem = await prisma.watchlistItem.findUnique({
            where: { id: req.params.id }
        })

        if (!watchlistItem) {
            return res.status(404).json({ error: "Watchlist item not found" });
        }

        //! Check if the user is the owner of this watchlist item
        if (watchlistItem.userId !== req.user.id) {
            return res.status(403).json({ error: "Not allowed to update this watchlist item" });
        }

        const updateData = {};
        if (status !== undefined) updateData.status = status.toUpperCase();
        if (rating !== undefined) updateData.rating = rating;
        if (notes !== undefined) updateData.notes = notes;

        const updatedItem = await prisma.watchlistItem.update({
            where: { id: req.params.id },
            data: updateData,
        });

        res.status(200).json({
            status: "success",
            data: {
                watchlistItem: updatedItem
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const removeFromWatchlist = async (req, res) => {
    try {
        const watchlistItem = await prisma.watchlistItem.findUnique({
            where: { id: req.params.id }
        })

        if (!watchlistItem) {
            return res.status(404).json({ error: "Watchlist item not found" });
        }

        //! Check if the user is the owner of this watchlist item
        if (watchlistItem.userId !== req.user.id) {
            return res.status(403).json({ error: "Not allowed to delete this watchlist item" });
        }

        await prisma.watchlistItem.delete({
            where: { id: req.params.id }
        })

        res.status(200).json({
            status: "success",
            message: "Movie removed from watchlist"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export { addToWatchlist, removeFromWatchlist, updateWatchlistItem };

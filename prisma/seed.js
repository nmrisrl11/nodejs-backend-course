import { prisma } from "../src/config/db.js";

const userId = "4d077e7b-0eca-4d23-973a-db702af005bd";

const movies = [
    {
        title: "Interstellar",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseYear: 2014,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        runtime: 169,
        posterUrl: "https://example.com/interstellar.jpg",
        createdBy: userId,
    },
    {
        title: "Inception",
        overview: "A skilled thief is given a chance at redemption if he can successfully plant an idea into a target's subconscious.",
        releaseYear: 2010,
        genres: ["Action", "Sci-Fi", "Thriller"],
        runtime: 148,
        posterUrl: "https://example.com/inception.jpg",
        createdBy: userId,
    },
    {
        title: "Ad Astra",
        overview: "An astronaut ventures into space to find his missing father and uncover a mystery threatening the Solar System.",
        releaseYear: 2019,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        runtime: 124,
        posterUrl: "https://example.com/ad-astra.jpg",
        createdBy: userId,
    },
    {
        title: "Looper",
        overview: "A hitman working for a future crime syndicate faces his older self when a job goes wrong.",
        releaseYear: 2012,
        genres: ["Action", "Drama", "Sci-Fi"],
        runtime: 118,
        posterUrl: "https://example.com/looper.jpg",
        createdBy: userId,
    },
    {
        title: "Joker",
        overview: "A mentally troubled comedian embarks on a downward spiral that leads to the creation of an iconic villain.",
        releaseYear: 2019,
        genres: ["Crime", "Drama", "Thriller"],
        runtime: 122,
        posterUrl: "https://example.com/joker.jpg",
        createdBy: userId,
    }
];

const main = async () => {
    console.log("Seeding movies...");

    for(const movie of movies) {
        await prisma.movie.create({
            data: movie
        })

        console.log(`Created movie: `, movie.title);
    }

    console.log("Seeding completed!");
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
})
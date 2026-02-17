To properly format schema.prisma
    - Press Shift + Alt + F

To update database schema 
    - Run `npx prisma migrate dev`
    - Or `npx prisma migrate dev --name describe_your_change`

To update only the Prisma Client without changing the database
    - Run `npx prisma generate`

    Example
    - You pulled a repo
    - The database already matches the schema
    - Client is missing

JWT Token - JSON Web Token

Middleware
- Apply middleware to all routes
Example: `router.use(authMiddleware);`

- Apply middleware to specific route
Example: `router.post("/", authMiddleware, addToWatchlist)`
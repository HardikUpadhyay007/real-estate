// import express from "express";
// import postRoute from "./routes/post.route.js";
// import authRoute from "./routes/auth.route.js";
// const app = express();

// app.use(express.json());
// app.use("/api/posts", postRoute);
// app.use("/api/auth", authRoute);

// app.listen(8800, (err) => {
//     if (err) {
//         console.error("Failed to start server:", err);
//     } else {
//         console.log("Server is running on port 8800");
//     }
// });
import express from "express";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import prisma from "./lib/prisma.js"; // Import Prisma client

const app = express();

app.use(express.json());
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

// Route to check database connection
app.get("/api/check-db-connection", async (req, res) => {
    try {
        await prisma.$connect();
        res.status(200).json({ message: "Database connection successful" });
    } catch (err) {
        console.error("Database connection failed:", err);
        res.status(500).json({
            message: "Database connection failed",
            error: err.message,
        });
    } finally {
        await prisma.$disconnect();
    }
});

app.listen(8800, (err) => {
    if (err) {
        console.error("Failed to start server:", err);
    } else {
        console.log("Server is running on port 8800");
    }
});

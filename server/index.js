import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB  from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/books.routes.js";
import myBooksRoutes from "./routes/mybooks.routes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/mybooks", myBooksRoutes);

app.get("/", (req, res) => res.send("Books Library API"));

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

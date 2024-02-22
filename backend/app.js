import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/connection.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

// připojení k databázi
connectDB(DB);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Route
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));

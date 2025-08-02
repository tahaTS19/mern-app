import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "./Middleware/rateLimiter.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();

console.log(process.env.MONGO_URI)

const app = express();
const PORT = process.env.PORT || 5001

//Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://notespace-tau.vercel.app"],
    credentials: true 
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
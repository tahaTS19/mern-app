import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; //new change

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
    origin: ["http://localhost:5173"], //new change: [x]
    credentials: true  //new change
  })
);
app.use(express.json());
app.use(rateLimiter);

//Simple Custom Middleware
// app.use((req, res, next) => {
//   console.log(`Request method is ${req.method} & Request URL is ${req.url}`);
//   next();
// })
app.use(cookieParser()); //new Change
app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
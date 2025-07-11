import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';

import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "./Middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname =path.resolve();

//Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

//Simple Custom Middleware
// app.use((req, res, next) => {
//   console.log(`Request method is ${req.method} & Request URL is ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
  });
}

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
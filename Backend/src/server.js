import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./Middleware/rateLimiter.js";

dotenv.config();

console.log(process.env.MONGO_URI)

const app = express();
const PORT = process.env.PORT || 5001

//Middleware
app.use(express.json());
app.use(rateLimiter);

//Simple Custom Middleware
// app.use((req, res, next) => {
//   console.log(`Request method is ${req.method} & Request URL is ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
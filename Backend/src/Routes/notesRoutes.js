import express from "express"
import { getAllNotes, createNote, deleteNote, getNoteById, updateNote } from "../Controllers/notesController.js";
import middleware from "../Middleware/UserMiddleware.js";

const router = express.Router();

router.get("/", middleware, getAllNotes); //get all the notes

router.get("/:id", getNoteById); //get one specific note

router.post("/", middleware, createNote); //create a note

//In put(update) and delete we need ".../:id" so we know what part to update or delete
router.put("/:id", updateNote); //update a note
router.delete("/:id", deleteNote); //delete a note

export default router;
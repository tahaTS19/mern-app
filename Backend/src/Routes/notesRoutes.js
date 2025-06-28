import express from "express"
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../Controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes); //get all the notes
router.get("/:id", getNoteById); //get one specific note
router.post("/", createNote ); //create a note
//In put(update) and delete we need ".../:id" so we know what part to update or delete
router.put("/:id", updateNote); //update a note
router.delete("/:id", deleteNote); //delete a note

export default router;
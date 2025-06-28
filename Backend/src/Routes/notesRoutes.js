import express from "express"
import { createNote, deleteNote, getAllNotes, updateNote } from "../Controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
//Endpoints/Routes 
router.post("/", createNote );
//In put(update) and delete we need ".../:id" so we know what part to update or delete
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
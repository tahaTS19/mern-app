import mongoose from "mongoose";

//1-create a schema
//2-model based off of that schema

const noteSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
  },
  content: {
    type:String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{ timestamps: true } //Created at, updated at
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
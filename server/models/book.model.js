import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  coverImage: String,
  availability: Boolean,
});

export const Book = mongoose.model("Book", bookSchema);

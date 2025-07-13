import { Book } from "../models/book.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, author, coverImage, availability } = req.body;

    if (!title || !author || !coverImage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBook = new Book({ title, author, coverImage, availability });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: "Failed to add book" });
  }
};

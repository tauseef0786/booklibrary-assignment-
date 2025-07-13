import { MyBook } from "../models/mybook.model.js";

// Get all books added by logged-in user
export const getMyBooks = async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.userId }).populate("bookId");
    res.json(myBooks);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's books", error: err.message });
  }
};

// Add a book to MyBooks list
export const addToMyBooks = async (req, res) => {
  try {
    const { bookId } = req.params;

    const exists = await MyBook.findOne({ userId: req.userId, bookId });
    if (exists) return res.status(400).json({ message: "Book already added" });

    const entry = new MyBook({ userId: req.userId, bookId });
    await entry.save();

    res.status(201).json({ message: "Book added to MyBooks" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add book", error: err.message });
  }
};

// Update reading status
export const updateStatus = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Want to Read", "Currently Reading", "Read"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const result = await MyBook.updateOne(
      { userId: req.userId, bookId },
      { status }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Book not found in MyBooks" });
    }

    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};

// Update book rating
export const updateRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const result = await MyBook.updateOne(
      { userId: req.userId, bookId },
      { rating: numRating }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Book not found in MyBooks" });
    }

    res.json({ message: "Rating updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update rating", error: err.message });
  }
};

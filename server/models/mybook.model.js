import mongoose from "mongoose";

const myBookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  status: {
    type: String,
    enum: ["Want to Read", "Currently Reading", "Read"],
    default: "Want to Read",
  },
  rating: { type: Number, min: 1, max: 5 },
});

export const MyBook = mongoose.model("MyBook", myBookSchema);

import { useState } from "react";

const MyBookCard = ({ entry, onStatusChange, onRatingChange }) => {
  const { bookId, status, rating } = entry;
  const book = bookId;
  const [saved, setSaved] = useState(false);

  const handleStatus = async (e) => {
    await onStatusChange(book._id, e.target.value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRating = async (val) => {
    await onRatingChange(book._id, val);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="border p-4 rounded shadow bg-white">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-bold">{book.title}</h2>
      <p className="text-gray-600 mb-2">by {book.author}</p>

      <div className="mb-2">
        <label className="mr-2 font-semibold">Status:</label>
        <select
          value={status}
          onChange={handleStatus}
          className="border px-2 py-1 rounded"
        >
          <option>Want to Read</option>
          <option>Currently Reading</option>
          <option>Read</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="mr-2 font-semibold">Rating:</label>
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            onClick={() => handleRating(val)}
            className={`px-2 text-xl ${
              val <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {saved && (
        <p className="text-green-600 text-sm mt-2 font-medium">Saved!</p>
      )}
    </div>
  );
};

export default MyBookCard;

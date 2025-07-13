const MyBookCard = ({ entry, onStatusChange, onRatingChange }) => {
  const { bookId, status, rating } = entry;
  const book = bookId;

  const handleStatus = (e) => {
    onStatusChange(book._id, e.target.value);
  };

  const handleRating = (val) => {
    onRatingChange(book._id, val);
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

      {status !== "Read" && (
        <button
          onClick={() => onStatusChange(book._id, "Read")}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600"
        >
          Mark as Complete
        </button>
      )}

      <div className="mb-2 mt-4">
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
    </div>
  );
};

export default MyBookCard;

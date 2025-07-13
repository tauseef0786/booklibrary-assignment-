const BookCard = ({ book, alreadyAdded, status, onAddToMyBooks }) => {
  const handleClick = () => {
    onAddToMyBooks(book._id);
  };

  return (
    <div className="border p-4 rounded-lg shadow bg-white transition hover:shadow-md">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-gray-500 mb-2">by {book.author}</p>

      {alreadyAdded && (
        <p className="text-green-600 text-sm font-medium mb-2">
          ✔ {status}
        </p>
      )}

      {book.availability ? (
        <button
          onClick={handleClick}
          disabled={alreadyAdded}
          className={`w-full py-2 rounded font-medium transition-colors duration-200 ${
            alreadyAdded
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {alreadyAdded ? "✓ Added" : "Want to Read"}
        </button>
      ) : (
        <p className="text-red-500 font-medium mt-2">Not Available</p>
      )}
    </div>
  );
};

export default BookCard;

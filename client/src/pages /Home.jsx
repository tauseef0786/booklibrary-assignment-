import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useAuth();

  const fetchBooks = async () => {
    try {
      const res = await axios.get("https://booklibrary-assignment.vercel.app/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  const fetchMyBooks = async () => {
    try {
      const res = await axios.get("https://booklibrary-assignment.vercel.app/api/mybooks", {
        withCredentials: true,
      });
      setMyBooks(res.data); // full entries with bookId, status, rating
    } catch (err) {
      console.error("Error fetching my books", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchBooks();
      if (isAuth) await fetchMyBooks();
      setLoading(false);
    };
    load();
  }, [isAuth]);

  const handleAddToMyBooks = async (bookId) => {
    try {
      await axios.post(
        `https://booklibrary-assignment.vercel.app/api/mybooks/${bookId}`,
        {},
        { withCredentials: true }
      );
      await fetchMyBooks(); // refresh data after adding
    } catch (err) {
      console.error("Failed to add book", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading books...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {books.map((book) => {
        const match = myBooks.find((entry) => entry.bookId._id === book._id);
        const alreadyAdded = !!match;
        const status = match?.status || null;

        return (
          <BookCard
            key={book._id}
            book={book}
            alreadyAdded={alreadyAdded}
            status={status}
            onAddToMyBooks={handleAddToMyBooks}
          />
        );
      })}
    </div>
  );
};

export default Home;

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuth, logout } = useAuth();
  const location = useLocation();

  const navLinkClass =
    "text-gray-700 hover:text-blue-600 transition duration-200 px-3 py-2 rounded-md font-medium";

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      <Link to="/" className="text-2xl font-bold text-blue-700 tracking-tight">
         My Library
      </Link>


      <div className="flex items-center space-x-4">
        {isAuth ? (
          <>
            <Link to="/mybooks" className={navLinkClass}>
              My Books
            </Link>

            <span className="text-sm text-blue-800 bg-blue-100 px-3 py-1 rounded-full font-medium">
              {user.email}
            </span>

            <button
              onClick={logout}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1.5 rounded-lg border border-red-300 shadow-sm transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={navLinkClass}>
              Login
            </Link>
            <Link to="/register" className={navLinkClass}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

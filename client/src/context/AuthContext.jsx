import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ✅ Use your deployed backend API base URL
const BASE_URL = "https://booklibrary-assignment.vercel.app/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores the logged-in user
  const [loading, setLoading] = useState(true); // for initial auth check

  // ✅ Fetch current user on first load (using cookie-based session)
  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/me`, {
        withCredentials: true, // ✅ very important for cookies to work
      });
      setUser(res.data);
    } catch (err) {
      setUser(null); // not logged in or token expired
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // ✅ Login handler
  const login = async (email, password) => {
    await axios.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      { withCredentials: true } // ✅ send cookie
    );
    return getUser();
  };

  // ✅ Register handler
  const register = async (email, password) => {
    await axios.post(
      `${BASE_URL}/auth/register`,
      { email, password },
      { withCredentials: true } // ✅ set cookie
    );
    return getUser();
  };

  // ✅ Logout handler
  const logout = async () => {
    await axios.get(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

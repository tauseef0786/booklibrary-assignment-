import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ✅ Define API base URL (can also come from .env if needed)
const BASE_URL = "http://localhost:3030/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Get current user on first load
  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // ✅ Login
  const login = async (email, password) => {
    await axios.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return getUser();
  };

  // ✅ Register
  const register = async (email, password) => {
    await axios.post(
      `${BASE_URL}/auth/register`,
      { email, password },
      { withCredentials: true }
    );
    return getUser();
  };

  // ✅ Logout
  const logout = async () => {
    await axios.get(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuth: !!user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);

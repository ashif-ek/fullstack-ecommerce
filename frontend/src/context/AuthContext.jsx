import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import Api, { clearAccessToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token");

      // No token → user is logged out → do NOT call /auth/me
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await Api.get("/auth/me/");
        setUser(res.data);
      } catch {
        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const logout = useCallback(async () => {
    try {
      await Api.post("/auth/logout/");
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }, []); // Standard stable function

  /* 
     Optimization: 
     Memoizing the value object prevents all consumers (Navbar, Routes) 
     from re-rendering when 'user' hasn't changed.
  */
  const value = useMemo(() => ({
    user,
    setUser,
    logout,
    loading,
    isAuthenticated: Boolean(user),
  }), [user, loading, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

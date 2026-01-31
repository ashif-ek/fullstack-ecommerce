import { createContext, useContext, useEffect, useState } from "react";
import Api, { clearAccessToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const init = async () => {
    try {
      const res = await Api.get("/auth/me/");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  init();
}, []);


  /**
   * Logout
   */
  const logout = async () => {
    try {
      await Api.post("/auth/logout/");
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loading,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

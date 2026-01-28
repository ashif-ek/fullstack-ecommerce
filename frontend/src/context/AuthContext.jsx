// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();


// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Login function
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData)); 
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user"); 
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export function useAuth() {
//   return useContext(AuthContext);
// }


import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // finish hydration
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const value = useMemo(() => ({
    user, login, logout, loading
  }), [user, login, logout, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

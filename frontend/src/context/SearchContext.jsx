// context/SearchContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import Api from "../auth/api";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Load products once
  useEffect(() => {
    Api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  // Filter products when query changes
  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      return;
    }
    const lower = query.toLowerCase();
    setFiltered(
      products.filter(
        (p) =>
          p.name?.toLowerCase().includes(lower) ||
          p.description?.toLowerCase().includes(lower) ||
          p.category?.toLowerCase().includes(lower)
      )
    );
  }, [query, products]);

  return (
    <SearchContext.Provider value={{ query, setQuery, filtered }}>
      {children}
    </SearchContext.Provider>
  );
}



// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  return useContext(SearchContext);
}

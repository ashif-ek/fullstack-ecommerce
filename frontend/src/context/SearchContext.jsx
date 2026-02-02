// context/SearchContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Api from "../services/api";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load products ONCE (public endpoint)
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await Api.get("/products/");
        if (isMounted) {
          setProducts(res.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("SearchContext API error:", err);
          setError("Failed to load products");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered products (derived state)
  const filtered = useMemo(() => {
    if (!query.trim()) return [];

    const lower = query.toLowerCase();

    return products.filter((p) => {
      return (
        p.name?.toLowerCase().includes(lower) ||
        p.description?.toLowerCase().includes(lower) ||
        p.category?.toLowerCase().includes(lower)
      );
    });
  }, [query, products]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        filtered,
        loading,
        error,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  return useContext(SearchContext);
}

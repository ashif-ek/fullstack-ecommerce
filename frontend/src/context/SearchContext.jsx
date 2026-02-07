// context/SearchContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Api from "../services/api";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from backend with search query
  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Only fetch if there's a query, or fetch all (first page) if empty
        const endpoint = query ? `/products/?search=${encodeURIComponent(query)}` : "/products/";
        const res = await Api.get(endpoint);
        
        if (isMounted) {
          // Handle paginated response
          const results = res.data.results ? res.data.results : res.data;
          setProducts(results);
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

    // Debounce search requests
    timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [query]);

  // filtered is now just products, confusing naming but keeps API consistent
  const filtered = products;

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

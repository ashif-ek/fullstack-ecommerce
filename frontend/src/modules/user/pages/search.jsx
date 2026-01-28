import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Api from "../../../auth/api";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    Api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  useEffect(() => {
    if (!query.trim()) return setFiltered([]);
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
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white">
      {/* Header with Search */}
      <div className="bg-black/95 border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search perfumes..."
            className="w-full max-w-xl px-5 py-3 rounded-full bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/60 shadow-md transition"
          />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {filtered.length === 0 && query && (
          <p className="text-center text-gray-400 italic">
            No products found for "{query}"
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-light mb-2 tracking-wide">{p.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{p.category}</p>
                <p className="text-lg font-semibold mb-6">${p.price}</p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => addToCart(p)}
                    className="px-5 py-2 rounded-full bg-white text-black text-sm tracking-wide hover:bg-gray-200 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => addToWishlist(p)}
                    className="px-5 py-2 rounded-full border border-white/40 text-sm tracking-wide hover:bg-white/10 transition"
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

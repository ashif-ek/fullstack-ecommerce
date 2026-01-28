// components/SearchDropdown.jsx
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function SearchDropdown() {
  const { filtered, query } = useSearch();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  if (!query.trim()) return null;

  return (
    <div className="absolute w-full mt-2 bg-black text-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
      {filtered.length === 0 ? (
        <p className="p-4 text-gray-400 italic">No products found</p>
      ) : (
        filtered.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-4 border-b border-gray-700 hover:bg-gray-900 transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.images?.[0]}
                alt={p.name}
                className="w-14 h-14 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-sm text-gray-400">{p.category}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => addToCart(p)}
                className="px-3 py-1 bg-white text-black rounded-full text-sm"
              >
                Add
              </button>
              <button
                onClick={() => addToWishlist(p)}
                className="px-3 py-1 border border-white rounded-full text-sm"
              >
                ♥
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

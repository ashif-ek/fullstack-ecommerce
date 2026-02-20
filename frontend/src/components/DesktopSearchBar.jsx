import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const DesktopSearchBar = memo(({ closeMenu }) => {
  const { query, setQuery, filtered } = useSearch();
  const navigate = useNavigate();

  return (
    <div className="relative hidden md:block w-56">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search products" // Added aria-label for accessibility
        className="w-full px-3 py-1.5 rounded-full bg-white/90 text-black text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/60 shadow-md"
      />

      {query && filtered.length > 0 && (
        <div className="absolute mt-2 w-full bg-white text-black rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          {filtered.map((p) => {
            // Image Extraction Logic
            let imgUrl = "";
            if (p.images && p.images.length > 0) {
                const firstImg = p.images[0];
                imgUrl = typeof firstImg === "string" ? firstImg : firstImg.image;
            } else if (p.image) {
                imgUrl = p.image;
            }

            // Handle Relative URLs
            if (imgUrl && imgUrl.startsWith("/")) {
                // Ensure correct base URL if needed, though usually /media is handled by proxy or full URL
                // We'll use the environment variable if available, or just path if it works
                const apiUrl = import.meta.env.VITE_API_URL || "";
                imgUrl = `${apiUrl}${imgUrl}`;
            }

            return (
            <div
              key={p.id}
              onClick={() => {
                navigate(`/products/${p.id}`);
                setQuery("");
                if (closeMenu) closeMenu();
              }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt={p.name}
                  className="w-8 h-8 object-cover rounded"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-[8px] text-gray-500">
                    No Img
                </div>
              )}
              <div>
                <p className="text-sm">{p.name}</p>
                <p className="text-xs text-gray-500">${p.price}</p>
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  );
});

export default DesktopSearchBar;

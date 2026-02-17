import { toast } from "react-toastify";
import React, { useEffect, useState, memo } from "react";
import Api from "../../../services/api";
import { Link } from "react-router-dom";

// const TOP_PRODUCTS_LIMIT = 4; // Managed by backend now or default

/* ===============================
   Skeleton Loaders (UNCHANGED)
================================ */

const SkeletonCard = () => (
  <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
    <div className="h-80 bg-white/5 relative overflow-hidden" />
    <div className="p-6 space-y-4">
      <div className="h-6 w-3/4 bg-white/5 rounded" />
      <div className="h-4 w-1/2 bg-white/5 rounded" />
      <div className="h-6 w-1/4 bg-white/5 rounded" />
    </div>
  </div>
);

const TopSellingSkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
    {Array.from({ length: 4 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

/* ===============================
   Product Card (UNCHANGED UI)
================================ */

const TopProductCard = memo(({ product }) => {
  const getImageUrl = (itm) => {
    let img = Array.isArray(itm.images) ? itm.images[0] : itm.images || itm.image || "";
    // If it's a relative path (starts with /), prepend API URL
    if (img && img.startsWith("/")) {
        return `${import.meta.env.VITE_API_URL}${img}`;
    }
    // If it's already a full URL or empty, return as is
    return img;
  };
    
  const imageUrl = getImageUrl(product);

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden transition-all duration-700 hover:scale-105 block"
    >
{imageUrl ? (
  <img
    src={imageUrl}
    alt={product.name}
    className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
    loading="lazy"
  />
) : (
  <div className="w-full h-80 bg-white/5 flex items-center justify-center text-gray-500 text-sm">
    No Image
  </div>
)}

      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <h2 className="text-xl font-light mb-2 tracking-wider">
          {product.name}
        </h2>
        {product.category && (
          <p className="text-sm text-gray-300 mb-3 font-light tracking-widest">
            {product.category}
          </p>
        )}
        <p className="text-xl font-serif">$ {product.price}</p>
      </div>
    </Link>
  );
});

/* ===============================
   Main Component (FIXED)
================================ */

export default function TopSellingProducts() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      setLoading(true);
      try {
        const res = await Api.get("/products/top_selling/?limit=4");
        // The endpoint returns the list of products directly
        const products = Array.isArray(res.data) ? res.data : [];
        console.log("Top Selling Products Data:", products);
        setTopProducts(products);
      } catch (err) {
        console.error("Top products error:", err);
        toast.error("Could not load top-selling items.");
        setTopProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wider">
          Top Selling
        </h2>
        <p className="text-lg text-gray-400 font-light">
          Our most coveted scents
        </p>
        <div className="w-20 h-px bg-white/40 mx-auto mt-6" />
      </div>

      {loading ? (
        <TopSellingSkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {topProducts.map((product) => (
            <TopProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

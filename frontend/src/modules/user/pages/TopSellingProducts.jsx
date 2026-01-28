import { toast } from "react-toastify";
import React, { useEffect, useState, memo } from "react";
import Api from "../../../auth/api"; // Adjust path if needed
import { Link } from "react-router-dom";

// Number of top-selling products to display
const TOP_PRODUCTS_LIMIT = 4;

// --- Skeleton Loader Components (Copied from your Products page for consistency) ---
const SkeletonCard = () => (
  <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
    <div className="h-80 bg-white/5 relative overflow-hidden">
      <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
    <div className="p-6 space-y-4">
      <div className="h-6 w-3/4 bg-white/5 rounded relative overflow-hidden">
        <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="h-4 w-1/2 bg-white/5 rounded relative overflow-hidden">
        <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="h-6 w-1/4 bg-white/5 rounded relative overflow-hidden">
        <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  </div>
);

const TopSellingSkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
    {Array.from({ length: TOP_PRODUCTS_LIMIT }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

// --- Memoized Product Card (Adapted for Home Page) ---
// This card links to the main /products page.
const TopProductCard = memo(({ product }) => {
  // ✅ Note: Corrected src={product.images[0]}
  // Your db.json shows `images` is an array, so we select the first one.
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : "";

  return (
    <Link
      to="/products"
      className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden transition-all duration-700 hover:scale-105 block"
    >
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <h2 className="text-xl font-light mb-2 tracking-wider">{product.name}</h2>
        <p className="text-sm text-gray-300 mb-3 font-light tracking-widest">{product.category}</p>
        <p className="text-xl font-serif">$ {product.price}</p>
      </div>
    </Link>
  );
});

// --- Main Top Selling Products Component ---
export default function TopSellingProducts() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSelling = async () => {
      setLoading(true);
      try {
        // 1. Fetch all users and all products concurrently
        const [usersRes, productsRes] = await Promise.all([
          Api.get('/users'),
          Api.get('/products')
        ]);
        
        const usersData = usersRes.data;
        const productsData = productsRes.data;

        // 2. Create a map of all products for quick lookup
        const allProductsMap = new Map(productsData.map(p => [p.id, p]));

        // 3. Aggregate sales counts from all user orders
        const salesCounts = {};
        usersData.forEach(user => {
          if (user.orders && Array.isArray(user.orders)) {
            user.orders.forEach(order => {
              order.items.forEach(item => {
                salesCounts[item.id] = (salesCounts[item.id] || 0) + (item.quantity || 1);
              });
            });
          }
        });

        // 4. Sort product IDs by sale count (descending)
        const sortedProductIds = Object.keys(salesCounts).sort(
          (a, b) => salesCounts[b] - salesCounts[a]
        );

        // 5. Map sorted IDs back to full product objects
        const topSelling = sortedProductIds
          .map(id => allProductsMap.get(id))
          .filter(p => p && p.isActive !== false); // Ensure product exists and is active

        // 6. Set the state with the limited number of products
        setTopProducts(topSelling.slice(0, TOP_PRODUCTS_LIMIT));

      } catch (err) {
        console.error("Error fetching top selling products:", err);
        toast.error("Could not load top-selling items.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopSelling();
  }, []); // Runs once on component mount

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      {/* Title Section (Copied from your Products page) */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wider">Top Selling</h2>
        <p className="text-lg text-gray-400 font-light">Our most coveted scents</p>
        <div className="w-20 h-px bg-white/40 mx-auto mt-6"></div>
      </div>
      
      {/* Grid or Skeleton Loader */}
      {loading ? (
        <TopSellingSkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {topProducts.map((p) => (
            <TopProductCard product={p} key={p.id} />
          ))}
        </div>
      )}
    </div>
  );
}
// Removed toast import
import React, { useEffect, useState, useCallback, useRef } from "react";
import Api from "../../../services/api";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import ProductModal from "../components/ProductModal";

// Constants for pagination
const PRODUCTS_PER_PAGE = 9;

import ProductCardSkeleton from "../../../components/ProductCardSkeleton";

// --- Skeleton Loader Components ---

const ProductSkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

// --- Memoized Product Card Component ---
const ProductCard = React.memo(({ product, innerRef }) => {
  return (
    <Link
      ref={innerRef}
      key={product.id}
      className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden transition-all duration-700 hover:scale-105 cursor-pointer block"
      to={`/products/${product.id}`}
    >
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.stock > 0 && product.stock < 10 && (
                 <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Low Stock
                </span>
            )}
            {/* New Arrival Logic: < 7 days */}
            {(new Date() - new Date(product.created_at)) / (1000 * 60 * 60 * 24) < 7 && (
                <span className="backdrop-blur-md bg-blue-600/30 border border-blue-500/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    New
                </span>
            )}
            {/* Fresh Logic: < 24 hours */}
            {(new Date() - new Date(product.created_at)) / (1000 * 60 * 60) < 24 && (
                <span className="backdrop-blur-md bg-purple-600/40 border border-purple-500/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg animate-pulse">
                    Just Dropped
                </span>
            )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <h2 className="text-xl font-light mb-2 tracking-wider">{product.name}</h2>
        <p className="text-sm text-gray-300 mb-3 font-light tracking-widest">{product.category}</p>
        <p className="text-xl font-serif">$ {product.price}</p>
      </div>
    </Link>
  );
});

// --- Main Products Component ---
export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fetchError, setFetchError] = useState(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    setFetchError(null);
    try {

      const res = await Api.get(`/products/?page=${page}`);
      // Handle potential pagination structure or flat list
      const results = res.data.results ? res.data.results : res.data;
      const activeProducts = results.filter(p => p.isActive !== false);

      setProducts(prevProducts => {
        const combinedProducts = [...prevProducts, ...activeProducts];
        const uniqueProducts = combinedProducts.filter(
          (product, index, self) => index === self.findIndex(p => p.id === product.id)
        );
        return uniqueProducts;
      });

      // Update hasMore based on backend 'next' link or current chunk size
      if (res.data.next) {
         setHasMore(true);
      } else if (res.data.results) {
         setHasMore(false);
      } else {
         // Fallback for flat list
         setHasMore(results.length === PRODUCTS_PER_PAGE);
      }
    } catch (err) {
      console.error("error", err);
      // Use inline error state instead of toast
      setFetchError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const observer = useRef();
  const lastProductElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);


  const openProductModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handlers moved to ProductModal (ActionButtons) to avoid re-rendering list on feedback

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"></div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wider font-playfair">Essence Rare</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-light tracking-widest uppercase border-t border-b border-white/30 py-4">
              The Art of Scent
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wider">Our Collection</h2>
            <div className="w-20 h-px bg-white/40 mx-auto"></div>
          </div>
          
          {fetchError && (
              <div className="text-center mb-8 p-4 border border-red-500/20 bg-red-500/5 rounded">
                  <p className="text-red-400">{fetchError}</p>
              </div>
          )}
          
          {loading && products.length === 0 ? (
            <ProductSkeletonLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((p, index) => {
                if (products.length === index + 1) {
                  return <ProductCard product={p} key={p.id} innerRef={lastProductElementRef} />;
                } else {
                  return <ProductCard product={p} key={p.id} />;
                }
              })}
            </div>
          )}
          
          <div className="text-center py-10">
            {loading && products.length > 0 && <p className="text-gray-400">Loading more scents...</p>}
            {!loading && !hasMore && products.length > 0 && <p className="text-gray-500">You've reached the end of the collection.</p>}
          </div>
        </div>

        {/* Product Modal */}
        <ProductModal 
            isOpen={isModalOpen}
            product={selectedProduct}
            onClose={closeModal}
            user={user}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
        />
      </div>
      <Footer />
    </>
  );
}


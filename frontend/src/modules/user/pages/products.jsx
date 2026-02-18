// Removed toast import
import React, { useEffect, useState, useCallback, useRef } from "react";
import Api from "../../../services/api";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import InlineFeedback from "../../../components/InlineFeedback"; // Import InlineFeedback

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

  // Separate feedback states for Cart and Wishlist
  const [cartFeedback, setCartFeedback] = useState({ type: "", message: "", isVisible: false });
  const [wishlistFeedback, setWishlistFeedback] = useState({ type: "", message: "", isVisible: false });
  const [fetchError, setFetchError] = useState(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useAuth();
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

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
    // Reset feedbacks when opening modal
    setCartFeedback({ isVisible: false, message: "", type: "" });
    setWishlistFeedback({ isVisible: false, message: "", type: "" });
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

  const handleAddToCart = useCallback(() => {
    setCartFeedback({ isVisible: false, message: "", type: "" });
    if (!user) {
      setCartFeedback({ type: "error", message: "Please log in to add items", isVisible: true });
      return;
    }
    try {
        addToCart(selectedProduct.id, 1);
        setCartFeedback({ type: "success", message: "Added to cart", isVisible: true, duration: 2000 });
    } catch (err) {
        setCartFeedback({ type: "error", message: "Failed to add", isVisible: true });
    }
  }, [user, selectedProduct, addToCart]);
  
  const handleAddToWishlist = useCallback(() => {
    setWishlistFeedback({ isVisible: false, message: "", type: "" });
    if (!user) {
      setWishlistFeedback({ type: "error", message: "Please log in to wishlist", isVisible: true });
      return;
    }
    const result = addToWishlist(selectedProduct);
    if (result && result.message) {
         // Check if it was "Added" or "Already in" based on message content or return type
         // Assuming generic success for now. logic in wishlist context might vary.
         // Context implementation: if (exists) toast.info else toast.success
         // We should update context to return status.
         // Assuming context returns object { success, message } from my previous edits? 
         // Checked Context: yes, returns { success: true/false, message: "..." }
         if (result.success) {
             setWishlistFeedback({ type: "success", message: result.message, isVisible: true, duration: 2000 });
         } else {
             setWishlistFeedback({ type: "info", message: result.message, isVisible: true, duration: 2000 });
         }
    } else {
         // Fallback if context wrapper didn't return
         setWishlistFeedback({ type: "success", message: "Updated wishlist", isVisible: true });
    }
  }, [user, selectedProduct, addToWishlist]);
  
  const isAddedToCart = selectedProduct ? cart.some(item => item.id === selectedProduct.id) : false;
  const isAddedToWishlist = selectedProduct ? wishlist.some(item => item.id === selectedProduct.id) : false;

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
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg">
              <button onClick={closeModal} className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-96 md:h-full">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-light mb-2">{selectedProduct.name}</h2>
                  <p className="text-sm text-gray-300 mb-6 uppercase tracking-widest">{selectedProduct.category}</p>
                  <p className="text-xl font-serif mb-6">$ {selectedProduct.price}</p>
                  <p className="text-gray-300 mb-8 leading-relaxed">{selectedProduct.description}</p>
                  
                  <div className="mb-8">
                    <p className="text-sm text-gray-400 mb-2">Stock: {selectedProduct.count}</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-white h-2 rounded-full" style={{ width: `${Math.min(selectedProduct.count / 10 * 100, 100)}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-8">

                    <div className="flex flex-col items-center space-y-2">
                      {isAddedToCart ? (
                        <Link
                          to="/carts"
                          className="w-full py-3 bg-white text-black text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center font-medium"
                        >
                          Go to Cart
                        </Link>
                      ) : (
                        <button
                          onClick={handleAddToCart}
                          disabled={selectedProduct.count <= 0}
                          className="w-full py-3 bg-white text-black text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {selectedProduct.count > 0 ? 'Add to Cart' : 'Save to Cart'}
                        </button>
                      )}
                      <InlineFeedback 
                        {...cartFeedback} 
                        onClose={() => setCartFeedback(p => ({ ...p, isVisible: false }))} 
                       />
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      {isAddedToWishlist ? (
                        <Link
                          to="/whishlist"
                          className="w-full py-3 border border-white/30 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 flex items-center justify-center font-medium"
                        >
                          Go to Wishlist
                        </Link>
                      ) : (
                        <button
                          onClick={handleAddToWishlist}
                          className="w-full py-3 border border-white/30 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300"
                        >
                          Save to Wishlist
                        </button>
                      )}
                       <InlineFeedback 
                        {...wishlistFeedback} 
                        onClose={() => setWishlistFeedback(p => ({ ...p, isVisible: false }))} 
                       />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

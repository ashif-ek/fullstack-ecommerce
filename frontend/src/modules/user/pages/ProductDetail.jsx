import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import Api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import InlineFeedback from "../../../components/InlineFeedback";
import ProductDetailSkeleton from "../../../components/ProductDetailSkeleton";
import SizingGuideModal from "../components/SizingGuideModal";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const { addToCart, cart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const { user } = useAuth(); // Get user

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cartFeedback, setCartFeedback] = useState({ isVisible: false, message: "", type: "" });
  const [wishlistFeedback, setWishlistFeedback] = useState({ isVisible: false, message: "", type: "" });
  const [reviewFeedback, setReviewFeedback] = useState({ isVisible: false, message: "", type: "" });
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", title: "" });
  const [submitting, setSubmitting] = useState(false);
  const [isSizingGuideOpen, setIsSizingGuideOpen] = useState(false);

  const handleImageClick = (imgSrc) => {
    setActiveImage(imgSrc);
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await Api.get(`/products/${id}/`);
      setProduct(res.data);
      const mainImg = res.data.images?.[0]?.image || res.data.image;
      setActiveImage(mainImg);
    } catch (err) {
      console.error("Failed to fetch product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product?.category) return;
    Api.get(`/products/?category=${encodeURIComponent(product.category)}`)
      .then((res) => {
        const others = (res.data.results || res.data || []).filter(
          (p) => p.id !== product.id
        );
        setRelatedProducts(others.slice(0, 4));
      })
      .catch((err) => console.error("Related products error:", err));
  }, [product]);

  // HANDLERS WITH INLINE FEEDBACK
  const handleAddToCart = async () => {
    setCartFeedback({ isVisible: false, message: "", type: "" });
    if (!user) {
        setCartFeedback({ type: "error", message: "Please log in to add items", isVisible: true });
        return;
    }
    try {
        await addToCart(product.id);
        setCartFeedback({ type: "success", message: "Added to cart", isVisible: true });
    } catch (err) {
        setCartFeedback({ type: "error", message: "Failed to add to cart", isVisible: true });
    }
  };

  const handleAddToWishlist = () => {
      setWishlistFeedback({ isVisible: false, message: "", type: "" });
      if (!user) {
          setWishlistFeedback({ type: "error", message: "Please log in to wishlist", isVisible: true });
          return;
      }
      const result = addToWishlist(product);
      if (result && result.message) {
           setWishlistFeedback({ 
               type: result.success ? "success" : "info", 
               message: result.message, 
               isVisible: true 
           });
      } else {
           // Fallback if context wrapper doesn't return result yet
           setWishlistFeedback({ type: "success", message: "Added to wishlist", isVisible: true });
      }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await Api.post("/products/reviews/", {
        product: id,
        ...newReview
      });
      setReviewFeedback({ type: "success", message: "Review submitted successfully!", isVisible: true });
      setNewReview({ rating: 5, comment: "", title: "" });
      fetchProduct(); 
    } catch (err) {
      console.error("Review submit error:", err);
      setReviewFeedback({ type: "error", message: "Failed to submit review. You might have already reviewed this.", isVisible: true });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !product) {
    return (
        <>
            <Navbar />
            <ProductDetailSkeleton />
        </>
    );
  }

  const galleryImages = product.images || [];
  
  return (
    <>
      <Navbar />

      <SizingGuideModal isOpen={isSizingGuideOpen} onClose={() => setIsSizingGuideOpen(false)} />

      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        
        {/* Breadcrumbs / Top Nav */}
        <div className="pt-24 px-6 max-w-7xl mx-auto flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-gray-500">
            <div className="flex items-center gap-3">
                <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
                <span className="text-gray-700">/</span>
                <Link to="/products" className="hover:text-white transition-colors duration-300">Collection</Link>
                <span className="text-gray-700">/</span>
                <span className="text-white border-b border-white/20 pb-0.5">{product.name}</span>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                
                {/* LEFT COLUMN: Gallery (6 Cols - Reduced from 7 for better balance) */}
                <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-32">
                     {/* Main Image Container - Constrained height/ratio */}
                    <div className="relative aspect-[3.5/4.5] w-full max-w-lg mx-auto overflow-hidden bg-gray-900 group shadow-2xl shadow-white/5">
                         {activeImage ? (
                            <img
                                src={activeImage}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-700 font-light tracking-widest text-xs uppercase">Image Unavailable</div>
                        )}
                        
                        {/* Tags Overlay */}
                        <div className="absolute top-6 left-6 flex flex-col gap-3 items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                             {product.stock > 0 && product.stock < 10 && (
                                <span className="backdrop-blur-md bg-white/10 border border-white/10 text-white text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-[0.15em] shadow-lg">
                                    Low Stock
                                </span>
                             )}
                            {(new Date() - new Date(product.created_at)) / (1000 * 60 * 60 * 24) < 7 && (
                                <span className="backdrop-blur-md bg-blue-500/10 border border-blue-400/20 text-blue-100 text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-[0.15em] shadow-lg">
                                    New Arrival
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Thumbnails - Centered */}
                    {galleryImages.length > 0 && (
                        <div className="flex justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <button
                                onClick={() => handleImageClick(product.image)}
                                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border transition-all duration-300 ${
                                    activeImage === product.image ? "border-white opacity-100" : "border-transparent opacity-30 hover:opacity-100"
                                }`}
                            >
                                <img src={product.image} alt="Main" className="h-full w-full object-cover" />
                            </button>
                            {galleryImages.map((imgObj) => (
                                <button
                                    key={imgObj.id}
                                    onClick={() => handleImageClick(imgObj.image)}
                                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border transition-all duration-300 ${
                                        activeImage === imgObj.image ? "border-white opacity-100" : "border-transparent opacity-30 hover:opacity-100"
                                    }`}
                                >
                                    <img src={imgObj.image} alt="View" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: Info (6 Cols - Increased from 5) */}
                <div className="lg:col-span-6 flex flex-col justify-center min-h-[500px]">
                    <div className="space-y-10 max-w-lg">
                        
                        {/* Header */}
                        <div className="space-y-6 border-b border-white/10 pb-10">
                            <div className="space-y-2">
                                <h2 className="text-xs text-gray-500 tracking-[0.3em] uppercase">{product.category}</h2>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-none">{product.name}</h1>
                            </div>
                            
                            <div className="flex items-baseline justify-between">
                                <p className="text-2xl font-light text-gray-300 tracking-wide">${product.price}</p>
                                <div className="flex items-center gap-2 text-yellow-500/80">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-xs font-medium tracking-[0.1em] text-gray-400">
                                        {product.average_rating ? Number(product.average_rating).toFixed(1) : "New"} 
                                        <span className="text-gray-600 ml-1">({product.total_reviews} Reviews)</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-8">
                            <p className="text-gray-400 leading-relaxed font-light text-base md:text-lg">
                                {product.description}
                            </p>
                            
                            {/* Key Features Icons/Text */}
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs tracking-[0.15em] text-gray-500 uppercase">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                                    <span>Long-Lasting</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                                    <span>Premium Sourcing</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                                    <span>Unisex Scent</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                                    <span>Eco Packaging</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-6">
                            {cart.some(item => item.id === product.id) ? (
                                <Link
                                    to="/carts"
                                    className="w-full py-5 bg-white text-black font-semibold uppercase tracking-[0.2em] text-xs hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-3 group"
                                >
                                    <ShoppingBag size={16} />
                                    View In Cart
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ) : (
                                <div>
                                    <button
                                        onClick={() => {
                                             if (product.stock > 0) {
                                                handleAddToCart();
                                             } else {
                                                handleAddToWishlist();
                                             }
                                        }}
                                        disabled={false} 
                                        className={`w-full py-5 font-semibold uppercase tracking-[0.2em] text-xs transition-all duration-300 flex items-center justify-center gap-3 group ${
                                            product.stock > 0 
                                            ? "bg-white text-black hover:bg-gray-200" 
                                            : "bg-transparent border border-white/20 text-white hover:bg-white/5"
                                        }`}
                                    >
                                        {product.stock > 0 ? (
                                            <>
                                                <ShoppingBag size={16} /> Add to Cart
                                            </>
                                        ) : (
                                            <>
                                                <Heart size={16} /> Save to Wishlist
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}

                            <InlineFeedback 
                                {...cartFeedback} 
                                onClose={() => setCartFeedback(p => ({ ...p, isVisible: false }))} 
                            />

                            <div>
                                <button
                                    onClick={() => {
                                        if (wishlist.some(item => item.id === product.id)) {
                                            setWishlistFeedback({ type: "info", message: "Already in wishlist", isVisible: true });
                                        } else {
                                            handleAddToWishlist();
                                        }
                                    }}
                                    className="w-full py-4 text-gray-500 font-medium uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors flex items-center justify-center gap-2 group"
                                >
                                    <Heart size={14} className={`transition-colors group-hover:text-red-500 ${wishlist.some(item => item.id === product.id) ? "fill-white text-white" : ""}`} />
                                    {wishlist.some(item => item.id === product.id) ? "In Wishlist" : "Add to Wishlist"}
                                </button>
                                <InlineFeedback 
                                    {...wishlistFeedback} 
                                    onClose={() => setWishlistFeedback(p => ({ ...p, isVisible: false }))} 
                                />
                            </div>
                        </div>
                        
                        {/* Footer Details */}
                        <div className="pt-8 border-t border-white/5 text-xs text-gray-600 flex gap-8">
                             <Link to="/shipping-returns" className="hover:text-gray-400 transition-colors cursor-pointer">Shipping & Returns</Link>
                             <span className="hover:text-gray-400 transition-colors cursor-pointer" onClick={() => setIsSizingGuideOpen(true)}>Sizing Guide</span>
                             <span className="hover:text-gray-400 transition-colors cursor-pointer" onClick={() => {
                                 navigator.clipboard.writeText(window.location.href);
                             }}>Share</span>
                        </div>

                    </div>
                </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-40 border-t border-white/5 pt-20">
                    <h3 className="text-xl font-light tracking-[0.3em] mb-16 text-center uppercase text-gray-300">You May Also Like</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                        {relatedProducts.map((p) => (
                             <Link key={p.id} to={`/products/${p.id}`} className="group block">
                                <div className="aspect-[4/5] overflow-hidden bg-gray-900 mb-6 relative">
                                    <img 
                                        src={p.image || (p.images && p.images[0]?.image)} 
                                        alt={p.name} 
                                        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <span className="uppercase tracking-[0.2em] text-xs text-white border border-white px-4 py-2">View</span>
                                    </div>
                                </div>
                                <h4 className="text-sm font-normal mb-2 tracking-[0.1em] text-gray-300 group-hover:text-white transition-colors">{p.name}</h4>
                                <p className="text-gray-500 text-xs tracking-wider">${p.price}</p>
                             </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Reviews Section - Simplified/Refined */}
            <div className="mt-40 pt-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                         <h3 className="text-3xl font-thin tracking-wider mb-4">Reviews</h3>
                         <div className="flex justify-center items-center gap-2 text-yellow-500/60 mb-2">
                             {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={18} 
                                    fill={i < Math.round(product.average_rating || 0) ? "currentColor" : "none"} 
                                    className={i >= Math.round(product.average_rating || 0) ? "text-gray-800" : ""}
                                />
                             ))}
                         </div>
                         <p className="text-gray-600 text-xs tracking-[0.2em] uppercase">Based on {product.total_reviews} verified reviews</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Write Review */}
                        <div className="md:border-r border-white/10 md:pr-16">
                            <form onSubmit={handleReviewSubmit} className="space-y-6">
                                <p className="text-sm text-gray-400 uppercase tracking-widest mb-6">Write a Review</p>
                                
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className={`transition-colors p-1 ${newReview.rating >= star ? "text-yellow-500" : "text-gray-800 hover:text-gray-600"}`}
                                        >
                                            <Star fill="currentColor" size={24} />
                                        </button>
                                    ))}
                                </div>

                                <input 
                                    type="text"
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white placeholder-gray-700 transition-colors text-sm"
                                    placeholder="Title"
                                    value={newReview.title}
                                    onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                                    required
                                />
                                
                                <textarea
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white placeholder-gray-700 transition-colors h-32 resize-none text-sm leading-relaxed"
                                    placeholder="Share your thoughts..."
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                    required
                                />

                                <div className="space-y-4">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        {submitting ? "Submitting..." : "Post Review"}
                                    </button>
                                    <InlineFeedback 
                                        {...reviewFeedback} 
                                        onClose={() => setReviewFeedback(p => ({ ...p, isVisible: false }))} 
                                    />
                                </div>
                            </form>
                        </div>
                        
                        {/* List */}
                        <div className="space-y-12">
                             {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review) => (
                                    <div key={review.id} className="space-y-3">
                                        <div className="flex text-yellow-500/60 text-xs">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-800" : ""} />
                                            ))}
                                        </div>
                                        <h5 className="font-medium text-white tracking-wide">{review.title}</h5>
                                        <p className="text-gray-400 font-light text-sm leading-relaxed">"{review.comment}"</p>
                                        <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-2">{review.user} — {new Date(review.created_at).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-50">
                                    <p className="text-gray-500 font-light italic mb-2">No reviews yet.</p>
                                    <p className="text-gray-600 text-xs">Be the first to leave a review.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

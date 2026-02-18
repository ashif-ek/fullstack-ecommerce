import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Api from "../../../services/api";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import { Home, Package, Star, Share2, Heart, ShoppingBag, ArrowRight } from "lucide-react"; 

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const { addToCart, cart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  // Review State
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", title: "" });
  const [submitting, setSubmitting] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on id change
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.category) {
        fetchRelatedProducts();
    }
  }, [product]);

  const fetchProduct = () => {
    Api.get(`/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        // Set initial active image
        const mainImg = res.data.image || (res.data.images && res.data.images[0]?.image) || "";
        setActiveImage(mainImg);
      })
      .catch((err) => console.error("API error:", err));
  };
    
  const fetchRelatedProducts = async () => {
    try {
        const res = await Api.get(`/products/?category=${product.category}`);
        // Filter out current product and limit to 4
        const related = res.data.filter(p => p.id !== product.id).slice(0, 4);
        setRelatedProducts(related);
    } catch (err) {
        console.error("Error fetching related products:", err);
    }
  };

  const handleImageClick = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await Api.post("/products/reviews/", {
        product: id,
        ...newReview
      });
      toast.success("Review submitted successfully!");
      setNewReview({ rating: 5, comment: "", title: "" });
      fetchProduct(); // Re-fetch to see new review
    } catch (err) {
      console.error("Review submit error:", err);
      toast.error("Failed to submit review. You might have already reviewed this.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="h-12 w-12 border-t-2 border-white rounded-full animate-spin"></div>
                <p className="text-gray-400 font-light tracking-widest uppercase">Loading Essence...</p>
            </div>
        </div>
    );
  }

  // format images for gallery
  const galleryImages = product.images || [];
  
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        
        {/* Breadcrumbs / Top Nav */}
        <div className="pt-24 px-6 max-w-7xl mx-auto flex items-center justify-between text-xs tracking-widest uppercase text-gray-500">
            <div className="flex items-center gap-2">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/products" className="hover:text-white transition-colors">Collection</Link>
                <span>/</span>
                <span className="text-white border-b border-white/20 pb-0.5">{product.name}</span>
            </div>
            
            <div className="flex gap-4">
               {/* Previous/Next styling could go here if implemented */}
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                
                {/* LEFT COLUMN: Gallery (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                     {/* Main Image */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-gray-900 group">
                         {activeImage ? (
                            <img
                                src={activeImage}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-700 font-light">Image Unavailable</div>
                        )}
                        
                        {/* Tags Overlay */}
                        <div className="absolute top-6 left-6 flex flex-col gap-3 items-start">
                             {product.stock > 0 && product.stock < 10 && (
                                <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    Low Stock
                                </span>
                             )}
                            {(new Date() - new Date(product.created_at)) / (1000 * 60 * 60 * 24) < 7 && (
                                <span className="backdrop-blur-md bg-blue-500/20 border border-blue-400/20 text-blue-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    New Arrival
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    {galleryImages.length > 0 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <button
                                onClick={() => handleImageClick(product.image)} // Assuming main image is separate or need duplicate check
                                className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border transition-all duration-300 ${
                                    activeImage === product.image ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-80"
                                }`}
                            >
                                <img src={product.image} alt="Main" className="h-full w-full object-cover" />
                            </button>
                            {galleryImages.map((imgObj) => (
                                <button
                                    key={imgObj.id}
                                    onClick={() => handleImageClick(imgObj.image)}
                                    className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border transition-all duration-300 ${
                                        activeImage === imgObj.image ? "border-white opacity-100" : "border-transparent opacity-40 hover:opacity-80"
                                    }`}
                                >
                                    <img src={imgObj.image} alt="View" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: Info (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col relative">
                    <div className="sticky top-32 space-y-8">
                        
                        {/* Header */}
                        <div className="space-y-4 border-b border-white/10 pb-8">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-wide">{product.name}</h1>
                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-serif text-gray-200">${product.price}</p>
                                <div className="flex items-center gap-2 text-yellow-500/80">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm font-medium tracking-wide text-gray-400">
                                        4.8 <span className="text-gray-600">(120 Reviews)</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <p className="text-gray-400 leading-relaxed font-light text-lg">
                                {product.description}
                            </p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400 uppercase tracking-widest">{product.category}</span>
                                <span className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400 uppercase tracking-widest">Unisex</span>
                                <span className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400 uppercase tracking-widest">Long-lasting</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-4">
                            {cart.some(item => item.id === product.id) ? (
                                <Link
                                    to="/carts"
                                    className="w-full py-4 bg-white text-black font-medium uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group"
                                >
                                    <ShoppingBag size={18} />
                                    View In Cart
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ) : (
                                <button
                                    onClick={() => {
                                         if (product.stock > 0) {
                                            addToCart(product.id);
                                         } else {
                                            addToWishlist(product);
                                            toast.success("Saved to Wishlist!");
                                         }
                                    }}
                                    disabled={false} // Always enabled (Add or Save)
                                    className={`w-full py-4 font-medium uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group ${
                                        product.stock > 0 
                                        ? "bg-white text-black hover:bg-gray-200" 
                                        : "bg-transparent border border-white/30 text-white hover:bg-white/10"
                                    }`}
                                >
                                    {product.stock > 0 ? (
                                        <>
                                            <ShoppingBag size={18} /> Add to Cart
                                        </>
                                    ) : (
                                        <>
                                            <Heart size={18} /> Save to Wishlist
                                        </>
                                    )}
                                </button>
                            )}

                            <button
                                onClick={() => {
                                    if (wishlist.some(item => item.id === product.id)) {
                                        // Maybe remove? For now just notify
                                        toast.info("Already in your wishlist");
                                    } else {
                                        addToWishlist(product);
                                        toast.success("Added to Wishlist");
                                    }
                                }}
                                className="w-full py-4 border border-white/20 text-gray-300 font-light uppercase tracking-[0.2em] hover:border-white hover:text-white transition-colors flex items-center justify-center gap-2"
                            >
                                <Heart size={18} className={wishlist.some(item => item.id === product.id) ? "fill-white text-white" : ""} />
                                {wishlist.some(item => item.id === product.id) ? "In Wishlist" : "Add to Wishlist"}
                            </button>
                        </div>
                        
                        {/* Features / Details Accordion-ish */}
                        <div className="border-t border-white/10 pt-6 space-y-4">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Package size={16} />
                                    <span>Free Shipping over $100</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Share2 size={16} />
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            toast.success("Link copied!");
                                        }}
                                        className="hover:text-white transition-colors"
                                    >
                                        Share Product
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-32">
                    <h3 className="text-2xl font-light tracking-[0.2em] mb-12 text-center uppercase">You May Also Like</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {relatedProducts.map((p) => (
                             <Link key={p.id} to={`/products/${p.id}`} className="group block">
                                <div className="aspect-[4/5] overflow-hidden bg-gray-900 mb-4 relative">
                                    <img 
                                        src={p.image || (p.images && p.images[0]?.image)} 
                                        alt={p.name} 
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <h4 className="text-lg font-light mb-1 group-hover:underline decoration-from-font underline-offset-4 decoration-white/30">{p.name}</h4>
                                <p className="text-gray-400 font-serif">${p.price}</p>
                             </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <div className="mt-32 border-t border-white/10 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Review Summary / Write Review */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-3xl font-thin tracking-wide mb-2">Reviews</h3>
                            <div className="flex items-baseline gap-4">
                                <span className="text-5xl font-serif">4.8</span>
                                <div className="flex text-yellow-500">
                                    <Star fill="currentColor" size={20} />
                                    <Star fill="currentColor" size={20} />
                                    <Star fill="currentColor" size={20} />
                                    <Star fill="currentColor" size={20} />
                                    <Star fill="currentColor" size={20} />
                                </div>
                            </div>
                            <p className="text-gray-500 mt-2 text-sm">Based on 120 verified reviews</p>
                        </div>
                        
                        <form onSubmit={handleReviewSubmit} className="bg-white/5 p-8 rounded-sm backdrop-blur-sm border border-white/5 space-y-5">
                            <h4 className="text-lg font-light tracking-wide uppercase">Write a Review</h4>
                            
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className={`transition-colors ${newReview.rating >= star ? "text-yellow-400" : "text-gray-600 hover:text-gray-400"}`}
                                    >
                                        <Star fill="currentColor" size={20} />
                                    </button>
                                ))}
                            </div>

                            <input 
                                type="text"
                                className="w-full bg-black/50 border-b border-white/20 py-3 text-white focus:outline-none focus:border-white placeholder-gray-600 transition-colors"
                                placeholder="Title of your review"
                                value={newReview.title}
                                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                                required
                            />
                            
                            <textarea
                                className="w-full bg-black/50 border-b border-white/20 py-3 text-white focus:outline-none focus:border-white placeholder-gray-600 transition-colors h-24 resize-none"
                                placeholder="Tell us what you think..."
                                value={newReview.comment}
                                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                required
                            />

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-white text-black py-3 uppercase tracking-widest text-xs font-bold hover:bg-gray-200 transition-colors"
                            >
                                {submitting ? "Submitting..." : "Post Review"}
                            </button>
                        </form>
                    </div>

                    {/* Review List */}
                    <div className="lg:col-span-2 space-y-6">
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((review) => (
                                <div key={review.id} className="border-b border-white/10 pb-8 last:border-0">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex text-yellow-500 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-600" : ""} />
                                                ))}
                                            </div>
                                            <h5 className="font-medium text-lg tracking-wide">{review.title}</h5>
                                        </div>
                                        <span className="text-xs text-gray-500 uppercase tracking-widest">{new Date(review.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed font-light mb-4">"{review.comment}"</p>
                                    <p className="text-xs text-gray-500 font-medium">— {review.user}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-sm border border-white/5 border-dashed">
                                <p className="text-gray-500 font-light italic mb-4">No reviews yet.</p>
                                <p className="text-gray-600 text-sm">Be the first to share your experience with {product.name}.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

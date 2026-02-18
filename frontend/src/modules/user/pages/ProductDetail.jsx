import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Api from "../../../services/api";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import { Home, Package } from "lucide-react"; 


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const { addToCart, cart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  // Review State
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", title: "Review" });
  const [submitting, setSubmitting] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
    // fetchReviews(); // merged into product fetch or handled separately if needed
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

  const fetchReviews = () => {
      // Placeholder if we need separate review fetching
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
      setNewReview({ rating: 5, comment: "", title: "Review" });
      fetchProduct(); // Re-fetch to see new review if it's auto-approved or just to refresh
    } catch (err) {
      console.error("Review submit error:", err);
      toast.error("Failed to submit review. You might have already reviewed this.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) {
    return <div className="text-center mt-20 text-gray-400">Loading...</div>;
  }

  // format images for gallery
  // product.images is array of objects {id, image, ...}
  const galleryImages = product.images || [];
  
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
            
            {/* PRODUCT SECTION */}
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl shadow-lg p-8 relative mb-12">
            
                {/* Icons */}
                <div className="absolute top-4 right-4 flex gap-4 z-10">
                    <Link to="/" className="p-2 rounded-full hover:bg-white/10 transition" title="Home">
                    <Home size={22} />
                    </Link>
                    <Link to="/products" className="p-2 rounded-full hover:bg-white/10 transition" title="Products">
                    <Package size={22} />
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* LEFT: Image Gallery */}
                    <div className="flex-1 space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-white/5">
                            {activeImage ? (
                                <img
                                    src={activeImage}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-all duration-500"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-500">No Image</div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {galleryImages.length > 0 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {/* Include main product.image as first thumb if needed, but usually images[] covers it. 
                                    Depending on backend logic. Let's assume images[] has all. */}
                                {galleryImages.map((imgObj) => (
                                    <button
                                        key={imgObj.id}
                                        onClick={() => handleImageClick(imgObj.image)}
                                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                                            activeImage === imgObj.image ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
                                        }`}
                                    >
                                        <img src={imgObj.image} alt="" className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Info */}
                    <div className="flex-1 space-y-8 py-4">
                        <div>
                            {/* Breadcrumbs (Simple) */}
                            <div className="flex items-center text-xs text-gray-500 mb-4 tracking-widest uppercase">
                                <Link to="/" className="hover:text-white transition">Home</Link>
                                <span className="mx-2">/</span>
                                <Link to="/products" className="hover:text-white transition">Products</Link>
                                <span className="mx-2">/</span>
                                <span className="text-white">{product.name}</span>
                            </div>

                            <p className="text-gray-400 tracking-widest uppercase text-sm mb-2">{product.category}</p>
                            <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-4">{product.name}</h1>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-3xl font-serif">${product.price}</span>
                                {product.stock > 0 ? (
                                    <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">In Stock</span>
                                ) : (
                                    <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded">Out of Stock</span>
                                )} 
                                {product.stock > 0 && product.stock < 10 && (
                                    <span className="text-xs bg-orange-900/30 text-orange-400 px-2 py-1 rounded animate-pulse">
                                        Low Stock: Only {product.stock} left!
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed font-light">{product.description}</p>

                        <div className="flex gap-4 pt-4 border-t border-white/10">
                            {cart.some(item => item.id === product.id) ? (
                                <Link
                                    to="/carts"
                                    className="flex-1 flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition uppercase tracking-wider text-sm"
                                >
                                    Go to Cart
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
                                    className="flex-1 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                                >
                                    {product.stock > 0 ? "Add to Cart" : "Save to Cart"}
                                </button>
                            )}
                            {wishlist.some(item => item.id === product.id) ? (
                                <Link
                                    to="/whishlist"
                                    className="px-6 py-4 rounded-full border border-white hover:bg-white hover:text-black transition flex items-center justify-center"
                                    title="Go to Wishlist"
                                >
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => addToWishlist(product)}
                                    className="px-6 py-4 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
                                    title="Add to Wishlist"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </button>
                            )}
                        </div>

                        {/* Social Share */}
                        <div className="flex gap-4 pt-6 border-t border-white/10">
                            <span className="text-sm text-gray-400 uppercase tracking-widest">Share:</span>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success("Link copied to clipboard!");
                                }}
                                className="text-gray-400 hover:text-white transition text-xs uppercase tracking-widest"
                            >
                                Copy Link
                            </button>
                            <a 
                                href={`https://wa.me/?text=${encodeURIComponent(`Check out this ${product.name}: ${window.location.href}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-green-400 transition text-xs uppercase tracking-widest"
                            >
                                WhatsApp
                            </a>
                            <a 
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${product.name}`)}&url=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition text-xs uppercase tracking-widest"
                            >
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* RELATED PRODUCTS */}
            {relatedProducts.length > 0 && (
                <div className="mb-20">
                    <h3 className="text-2xl font-light tracking-wide mb-8">You May Also Like</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                             <Link key={p.id} to={`/products/${p.id}`} className="group block">
                                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-white/5 mb-4">
                                    <img 
                                        src={p.image || (p.images && p.images[0]?.image)} 
                                        alt={p.name} 
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h4 className="text-lg font-light mb-1">{p.name}</h4>
                                <p className="text-gray-400">${p.price}</p>
                             </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* REVIEWS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Review List */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-light tracking-wide border-b border-white/10 pb-4">Returns & Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="space-y-6">
                            {product.reviews.map((review) => (
                                <div key={review.id} className="bg-white/5 p-6 rounded-lg space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <div className="flex text-yellow-500 text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                                                ))}
                                            </div>
                                            <span className="text-sm font-bold text-white">{review.title}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">"{review.comment}"</p>
                                    <p className="text-xs text-gray-500 italic">- {review.user}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>
                    )}
                </div>

                {/* Write Review Form */}
                <div className="bg-white/5 p-8 rounded-xl h-fit">
                    <h3 className="text-xl font-light mb-6">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className={`text-2xl transition ${newReview.rating >= star ? "text-yellow-400 scale-110" : "text-gray-600 hover:text-gray-400"}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2">Title</label>
                            <input 
                                type="text"
                                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-white/50"
                                placeholder="Summarize your experience"
                                value={newReview.title}
                                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2">Comment</label>
                            <textarea
                                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-white/50 h-32"
                                placeholder="Tell us more about what you liked or didn't like"
                                value={newReview.comment}
                                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-white text-black font-medium uppercase tracking-widest py-3 rounded hover:bg-gray-200 transition disabled:opacity-50"
                        >
                            {submitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

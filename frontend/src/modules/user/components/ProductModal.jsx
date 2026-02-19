import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import InlineFeedback from '../../../components/InlineFeedback';

const ProductModal = React.memo(({ 
    product, 
    isOpen, 
    onClose, 
    user, 
    addToCart, 
    addToWishlist, 
    formattedPrice 
}) => {
    // Local feedback state to prevent parent re-renders
    const [cartFeedback, setCartFeedback] = useState({ type: "", message: "", isVisible: false });
    const [wishlistFeedback, setWishlistFeedback] = useState({ type: "", message: "", isVisible: false });

    // We can infer these, or pass them if we want to be strictly pure
    // But since this component is now connected to feedback state locally, we handle interactions here.
    
    // Check if added (This assumes cart/wishlist are passed or we use hooks here? 
    // If we use hooks here, we couple it to context. 
    // Better to pass `isAddedToCart` as prop? 
    // But `cart` changes frequently. 
    // Let's use the hooks since it's a "Smart" component now being extracted.)
    
    // Actually, to keep it pure(ish), let's stick to props for actions, but internal state for feedback.
    // Wait, if `addToCart` comes from parent, we need `cart` list to know if item is added.
    // Let's pass `isAddedToCart` and `isAddedToWishlist` as props from parent to ensure correct state.
    
    // RE-THINK: If we move feedback state HERE, we don't need to re-render Parent.
    
    const handleAddToCart = useCallback(() => {
        setCartFeedback({ isVisible: false, message: "", type: "" });
        if (!user) {
            setCartFeedback({ type: "error", message: "Please log in to add items", isVisible: true });
            return;
        }
        try {
            addToCart(product.id, 1);
            setCartFeedback({ type: "success", message: "Added to cart", isVisible: true, duration: 2000 });
        } catch (err) {
            setCartFeedback({ type: "error", message: "Failed to add", isVisible: true });
        }
    }, [user, product, addToCart]);

    const handleAddToWishlist = useCallback(() => {
        setWishlistFeedback({ isVisible: false, message: "", type: "" });
        if (!user) {
            setWishlistFeedback({ type: "error", message: "Please log in to wishlist", isVisible: true });
            return;
        }
        const result = addToWishlist(product);
        if (result && result.message) {
            if (result.success) {
                setWishlistFeedback({ type: "success", message: result.message, isVisible: true, duration: 2000 });
            } else {
                setWishlistFeedback({ type: "info", message: result.message, isVisible: true, duration: 2000 });
            }
        } else {
            setWishlistFeedback({ type: "success", message: "Updated wishlist", isVisible: true });
        }
    }, [user, product, addToWishlist]);

    if (!isOpen || !product) return null;

    // We need to know if it's in cart/wishlist for the UI buttons
    // We can accept a function or boolean prop. 
    // Let's Assume the parent passes the logic or we use the hooks. 
    // Using hooks here makes it self-contained for data, but relies on props for actions?
    // Let's import the hooks here to make it truly independent of parent re-renders for data changes not relevant to the list?
    // No, `Products` page has the list.
    
    // Let's stick to simpler: The Parent passes `checkIfInCart` or similar? 
    // OR, we just explicitly pass `isInCart` / `isInWishlist`.
    // NOTE: I will update the component to accept these as props.
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="h-96 md:h-full">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-8">
                        <h2 className="text-3xl font-light mb-2">{product.name}</h2>
                        <p className="text-sm text-gray-300 mb-6 uppercase tracking-widest">{product.category}</p>
                        <p className="text-xl font-serif mb-6">$ {product.price}</p>
                        <p className="text-gray-300 mb-8 leading-relaxed">{product.description}</p>
                        
                        <div className="mb-8">
                            <p className="text-sm text-gray-400 mb-2">Stock: {product.count}</p>
                            <div className="w-full bg-gray-700 h-2 rounded-full">
                                <div className="bg-white h-2 rounded-full" style={{ width: `${Math.min(product.count / 10 * 100, 100)}%` }}></div>
                            </div>
                        </div>
                        
                        <div className="space-y-4 mt-8">
                            <ActionButtons 
                                product={product}
                                user={user} 
                                onAddToCart={handleAddToCart} 
                                onAddToWishlist={handleAddToWishlist}
                                cartFeedback={cartFeedback}
                                onCloseCartFeedback={() => setCartFeedback(p => ({ ...p, isVisible: false }))}
                                wishlistFeedback={wishlistFeedback}
                                onCloseWishlistFeedback={() => setWishlistFeedback(p => ({ ...p, isVisible: false }))}
                                // We need to know status for buttons
                                // Since we moved logic here, we need access to cart.
                                // I will use the hooks inside ActionButtons or pass them.
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

// Helper component to keep the main modal clean and handle the boolean logic if we pull contexts here
// But to match the previous logic exactly without pulling extra contexts:
// I will expect the parent to pass `isAddedToCart` etc?
// No, the previous code calculated it in render: `const isAddedToCart = selectedProduct ? cart.some(...) : false;`
// If I want to avoid Parent re-rendering when Feedback changes, I must move Feedback state here.
// But `isAddedToCart` depends on `cart` from context.
// So `ProductModal` must check context.

import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';

const ActionButtons = ({ 
    product, user, onAddToCart, onAddToWishlist, 
    cartFeedback, onCloseCartFeedback, 
    wishlistFeedback, onCloseWishlistFeedback 
}) => {
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    
    const isAddedToCart = product ? cart.some(item => item.id === product.id) : false;
    const isAddedToWishlist = product ? wishlist.some(item => item.id === product.id) : false;

    return (
        <>
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
                        onClick={onAddToCart}
                        disabled={product.count <= 0}
                        className="w-full py-3 bg-white text-black text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {product.count > 0 ? 'Add to Cart' : 'Save to Cart'}
                    </button>
                )}
                <InlineFeedback {...cartFeedback} onClose={onCloseCartFeedback} />
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
                        onClick={onAddToWishlist}
                        className="w-full py-3 border border-white/30 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300"
                    >
                        Save to Wishlist
                    </button>
                )}
                <InlineFeedback {...wishlistFeedback} onClose={onCloseWishlistFeedback} />
            </div>
        </>
    );
};

export default ProductModal;

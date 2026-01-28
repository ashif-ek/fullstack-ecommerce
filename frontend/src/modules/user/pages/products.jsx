// // import { toast } from "react-toastify";
// // import { useEffect, useState } from "react";
// // import Api from "../../../auth/api";
// // import { useCart } from "../../../context/CartContext";
// // import { useWishlist } from "../../../context/WishlistContext";
// // import Navbar from "../../../components/navbar";
// // import Footer from "../../../components/footer";
// // import { useAuth } from "../../../context/AuthContext"; 

// // export default function Products() {
// //   // ui
// //   const [products, setProducts] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   // logic
// //    const { user } = useAuth(); 
// //   const { addToCart } = useCart();
// //   const { addToWishlist } = useWishlist();

// //   useEffect(() => {
// //     Api.get("/products")
// //       .then(res => setProducts(res.data))
// //       .catch(err => console.error("error", err));
// //   }, []);

// //   // Modal controlinhg
// //   const openProductModal = (product) => {
// //     setSelectedProduct(product);
// //     setIsModalOpen(true);
// //     document.body.style.overflow = 'hidden';
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     document.body.style.overflow = 'auto';
// //   };

// //   return (
// //     <>
// //     <Navbar/>
// //     <div className="min-h-screen bg-black text-white">
// //       <div className="relative h-screen flex items-center justify-center overflow-hidden">
// //         <div
// //           className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 transition-opacity duration-1000"
// //         ></div>
// //         <div className="relative z-10 text-center px-6">
// //           <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wider font-playfair">Essence Rare</h1>
// //           <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-light tracking-widest uppercase border-t border-b border-white/30 py-4">
// //             The Art of Scent
// //           </p>
// //           <div className="animate-bounce mt-20">
// //             <svg className="w-8 h-8 mx-auto text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
// //             </svg>
// //           </div>
// //         </div>
// //       </div>


// //       <div className="py-20 px-6 max-w-7xl mx-auto">
// //         <div className="text-center mb-16">
// //           <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wider">Our Collection</h2>
// //           <div className="w-20 h-px bg-white/40 mx-auto"></div>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
// //           {products.map((p) => (
// //             <div
// //               key={p.id}
// //               className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden transition-all duration-700 hover:scale-105 cursor-pointer"
// //               onClick={() => openProductModal(p)}
// //             >
// //               <div className="overflow-hidden">
// //                 <img
// //                   src={p.images}
// //                   alt={p.name}
// //                   className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
// //               </div>
// //               <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
// //                 <h2 className="text-xl font-light mb-2 tracking-wider">{p.name}</h2>
// //                 <p className="text-sm text-gray-300 mb-3 font-light tracking-widest">{p.category}</p>
// //                 <p className="text-xl font-serif">$ {p.price}</p>
// //                 <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
// //                   <button className="text-xs tracking-widest uppercase border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300">
// //                     Discover
// //                   </button>
// //                 </div>
// //               </div>
// //               <div className="absolute top-4 right-4">
// //                 <span className="text-xs bg-white/10 backdrop-blur-lg px-2 py-1 rounded-full text-white/80">
// //                   {p.count} in stock
// //                 </span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Product Modal (design + logic) */}
// //       {isModalOpen && selectedProduct && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
// //           <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg">
// //             <button onClick={closeModal} className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors">
// //               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
// //               </svg>
// //             </button>
// //             <div className="grid md:grid-cols-2 gap-8">
// //               <div className="h-96 md:h-full">
// //                 <img src={selectedProduct.images} alt={selectedProduct.name} className="w-full h-full object-cover" />
// //               </div>
// //               <div className="p-8">
// //                 <h2 className="text-3xl font-light mb-2">{selectedProduct.name}</h2>
// //                 <p className="text-sm text-gray-300 mb-6 uppercase tracking-widest">{selectedProduct.category}</p>
// //                 <p className="text-xl font-serif mb-6">$ {selectedProduct.price}</p>
// //                 <p className="text-gray-300 mb-8 leading-relaxed">{selectedProduct.description}</p>
// //                 <div className="mb-8">
// //                   <p className="text-sm text-gray-400 mb-2">Stock: {selectedProduct.count}</p>
// //                   <div className="w-full bg-gray-700 h-2 rounded-full">
// //                     <div
// //                       className="bg-white h-2 rounded-full"
// //                       style={{ width: `${Math.min(selectedProduct.count / 10 * 100, 100)}%` }}
// //                     ></div>
// //                   </div>
// //                 </div>
                
// //                   <button
// //     onClick={() => {
// //       if (!user) {
// //         toast.error("plz login first, the add cart");
// //         return;
// //       }
// //       addToCart(selectedProduct);
// //       toast.success(`${selectedProduct.name} added to cart`);
// //     }}
// //     className="w-full py-3 bg-white text-black text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300"
// //   >
// //     Add to Cart
// //   </button>


// //     <button
// //     onClick={() => {
// //       if (!user) {
// //         toast.error("plz login first, then add to whishlist");
// //         return;
// //       }
// //       addToWishlist(selectedProduct);
// //       toast.success(`${selectedProduct.name} added to wishlist!`);
// //     }}
// //     className="w-full py-3 mt-4 border border-white/30 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300"
// //   >
// //     Save to Wishlist
// //   </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //     <Footer/>
// //     </>
// //   );
// // }












// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";
// import Api from "../../../auth/api";
// import { useCart } from "../../../context/CartContext";
// import { useWishlist } from "../../../context/WishlistContext";
// import Navbar from "../../../components/navbar";
// import Footer from "../../../components/footer";
// import { useAuth } from "../../../context/AuthContext";
// import { Link } from "react-router-dom";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { user } = useAuth();
//   const { cart, addToCart } = useCart();
//   const { wishlist, addToWishlist } = useWishlist();

//   const isAddedToCart = selectedProduct ? cart.some(item => item.id === selectedProduct.id) : false;
//   const isAddedToWishlist = selectedProduct ? wishlist.some(item => item.id === selectedProduct.id) : false;

// useEffect(() => {
//   Api.get("/products")
//     .then(res => {
//       const activeProducts = res.data.filter(p => p.isActive !== false);
//       //use false coz only show non false things 
//       setProducts(activeProducts);
//     })
//     .catch(err => console.error("error", err));
// }, []);


//   // Add this useEffect to clean up the body style on unmount
//   useEffect(() => {
//     // The function returned by useEffect is a cleanup function.
//     // It will be called automatically when the component is removed from the screen.
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []); // The empty dependency array means this effect runs once on mount and cleans up on unmount.


//   const openProductModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     document.body.style.overflow = 'auto';
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-black text-white">
//         {/* Hero Section */}
//         <div className="relative h-screen flex items-center justify-center overflow-hidden">
//           <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"></div>
//           <div className="relative z-10 text-center px-6">
//             <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wider font-playfair">Essence Rare</h1>
//             <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-light tracking-widest uppercase border-t border-b border-white/30 py-4">
//               The Art of Scent
//             </p>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="py-20 px-6 max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wider">Our Collection</h2>
//             <div className="w-20 h-px bg-white/40 mx-auto"></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {products.map((p) => (
//               <div
//                 key={p.id}
//                 className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden transition-all duration-700 hover:scale-105 cursor-pointer"
//                 onClick={() => openProductModal(p)}
//               >
//                 <div className="overflow-hidden">
//                   <img
//                     src={p.images}
//                     alt={p.name}
//                     className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
//                   <h2 className="text-xl font-light mb-2 tracking-wider">{p.name}</h2>
//                   <p className="text-sm text-gray-300 mb-3 font-light tracking-widest">{p.category}</p>
//                   <p className="text-xl font-serif">$ {p.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Modal */}
//         {isModalOpen && selectedProduct && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
//             <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg">
//               <button onClick={closeModal} className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path></svg>
//               </button>
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="h-96 md:h-full">
//                   <img src={selectedProduct.images} alt={selectedProduct.name} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="p-8">
//                   <h2 className="text-3xl font-light mb-2">{selectedProduct.name}</h2>
//                   <p className="text-sm text-gray-300 mb-6 uppercase tracking-widest">{selectedProduct.category}</p>
//                   <p className="text-xl font-serif mb-6">$ {selectedProduct.price}</p>
//                   <p className="text-gray-300 mb-8 leading-relaxed">{selectedProduct.description}</p>
                  
//                   <div className="mb-8">
//                     <p className="text-sm text-gray-400 mb-2">Stock: {selectedProduct.count}</p>
//                     <div className="w-full bg-gray-700 h-2 rounded-full">
//                       <div className="bg-white h-2 rounded-full" style={{ width: `${Math.min(selectedProduct.count / 10 * 100, 100)}%` }}></div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4 mt-8">
//                     <div className="flex items-center space-x-4">
//                       <button
//                         onClick={() => {
//                           if (!user) {
//                             toast.error("Please log in to add items to your cart.");
//                             return;
//                           }
//                           addToCart(selectedProduct);
//                           toast.success(`${selectedProduct.name} added to cart`);
//                         }}
//                         disabled={isAddedToCart}
//                         className="w-full py-3 bg-white text-black text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                       >
//                         {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
//                       </button>
//                       <Link to="/carts" className="text-white/70 hover:text-white transition-colors">
//                         <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
//                       </Link>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <button
//                         onClick={() => {
//                           if (!user) {
//                             toast.error("Please log in to add items to your wishlist.");
//                             return;
//                           }
//                           addToWishlist(selectedProduct);
//                           toast.success(`${selectedProduct.name} added to wishlist!`);
//                         }}
//                         disabled={isAddedToWishlist}
//                         className="w-full py-3 border border-white/30 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 disabled:border-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed"
//                       >
//                         {isAddedToWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
//                       </button>
//                       <Link to="/whishlist" className="text-white/70 hover:text-white transition-colors">
//                          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }














































// import { toast } from "react-toastify";
// import React, { useEffect, useState, useCallback, useRef } from "react";
// import Api from "../../../auth/api";
// import { useCart } from "../../../context/CartContext";
// import { useWishlist } from "../../../context/WishlistContext";
// import Navbar from "../../../components/navbar";
// import Footer from "../../../components/footer";
// import { useAuth } from "../../../context/AuthContext";
// import { Link } from "react-router-dom";

// // Constants for pagination
// const PRODUCTS_PER_PAGE = 9;

// // --- Memoized Product Card Component ---
// // By wrapping the ProductCard in React.memo, we ensure it only re-renders
// // if its own props (product, onOpenModal) change. This prevents all cards
// // from re-rendering when the parent state changes (e.g., opening the modal).
// const ProductCard = React.memo(({ product, onOpenModal, innerRef }) => {
//   return (
//     <div
//       ref={innerRef}
//       key={product.id}
//       className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden transition-all duration-700 hover:scale-105 cursor-pointer"
//       onClick={() => onOpenModal(product)}
//     >
//       <div className="overflow-hidden">
//         <img
//           src={product.images}
//           alt={product.name}
//           className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
//           loading="lazy" // Native lazy loading is great, keeping it!
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
//         <h2 className="text-xl font-light mb-2 tracking-wider">{product.name}</h2>
//         <p className="text-sm text-gray-300 mb-3 font-light tracking-widest">{product.category}</p>
//         <p className="text-xl font-serif">$ {product.price}</p>
//       </div>
//     </div>
//   );
// });

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // --- State for Lazy Loading / Infinite Scroll ---
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true); // To check if more products are available on the server

//   const { user } = useAuth();
//   const { cart, addToCart } = useCart();
//   const { wishlist, addToWishlist } = useWishlist();

//   // --- API Call with useCallback ---
//   // We wrap this in useCallback to prevent it from being redefined on every render.
//   // This is good practice for functions used inside useEffect.
//   const fetchProducts = useCallback(async () => {
//     if (!hasMore) return; // Don't fetch if we know there are no more products
//     setLoading(true);
//     try {
//       // Assuming your API supports pagination with _page and _limit (common with json-server)
//       // If not, you might need to adjust the API endpoint.
//       const res = await Api.get(`/products?_page=${page}&_limit=${PRODUCTS_PER_PAGE}`);
//       const activeProducts = res.data.filter(p => p.isActive !== false);

//       setProducts(prevProducts => [...prevProducts, ...activeProducts]);
//       setHasMore(res.data.length === PRODUCTS_PER_PAGE); // If we received fewer products than we asked for, there are no more.
//     } catch (err) {
//       console.error("error", err);
//       toast.error("Failed to fetch products.");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, hasMore]);


//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]); // fetchProducts is now a stable dependency due to useCallback


//   // --- Intersection Observer for Infinite Scroll ---
//   const observer = useRef();
//   const lastProductElementRef = useCallback(node => {
//     if (loading) return; // Don't trigger while loading
//     if (observer.current) observer.current.disconnect(); // Disconnect previous observer
//     observer.current = new IntersectionObserver(entries => {
//       // If the last element is visible and we have more products to load
//       if (entries[0].isIntersecting && hasMore) {
//         setPage(prevPage => prevPage + 1); // Trigger fetching the next page
//       }
//     });
//     if (node) observer.current.observe(node); // Observe the new last element
//   }, [loading, hasMore]);


//   // --- Event Handlers with useCallback ---
//   // This ensures that the function reference passed to children (like ProductCard)
//   // does not change on every render, making React.memo effective.
//   const openProductModal = useCallback((product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//     document.body.style.overflow = 'hidden';
//   }, []); // Empty dependency array as it doesn't depend on any props/state

//   const closeModal = useCallback(() => {
//     setIsModalOpen(false);
//     document.body.style.overflow = 'auto';
//   }, []);

//   // This useEffect now only handles the cleanup on unmount.
//   useEffect(() => {
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   const handleAddToCart = useCallback(() => {
//     if (!user) {
//       toast.error("Please log in to add items to your cart.");
//       return;
//     }
//     addToCart(selectedProduct);
//     toast.success(`${selectedProduct.name} added to cart`);
//   }, [user, selectedProduct, addToCart]);
  
//   const handleAddToWishlist = useCallback(() => {
//     if (!user) {
//       toast.error("Please log in to add items to your wishlist.");
//       return;
//     }
//     addToWishlist(selectedProduct);
//     toast.success(`${selectedProduct.name} added to wishlist!`);
//   }, [user, selectedProduct, addToWishlist]);
  
//   // These calculations are cheap, so useMemo isn't strictly necessary here,
//   // but it's good practice if the cart/wishlist arrays were to become very large.
//   const isAddedToCart = selectedProduct ? cart.some(item => item.id === selectedProduct.id) : false;
//   const isAddedToWishlist = selectedProduct ? wishlist.some(item => item.id === selectedProduct.id) : false;

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-black text-white">
//         {/* Hero Section (Unchanged) */}
//         <div className="relative h-screen flex items-center justify-center overflow-hidden">
//           <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"></div>
//           <div className="relative z-10 text-center px-6">
//             <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wider font-playfair">Essence Rare</h1>
//             <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-light tracking-widest uppercase border-t border-b border-white/30 py-4">
//               The Art of Scent
//             </p>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="py-20 px-6 max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wider">Our Collection</h2>
//             <div className="w-20 h-px bg-white/40 mx-auto"></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {products.map((p, index) => {
//               // If this is the last product, we attach the ref to it.
//               if (products.length === index + 1) {
//                 return <ProductCard product={p} onOpenModal={openProductModal} key={p.id} innerRef={lastProductElementRef} />;
//               } else {
//                 return <ProductCard product={p} onOpenModal={openProductModal} key={p.id} />;
//               }
//             })}
//           </div>
//            {/* Loading and End of List Indicators */}
//           <div className="text-center py-10">
//             {loading && <p className="text-gray-400">Loading more scents...</p>}
//             {!loading && !hasMore && products.length > 0 && <p className="text-gray-500">You've reached the end of the collection.</p>}
//           </div>
//         </div>

//         {/* Product Modal (Unchanged logic, but uses memoized handlers) */}
//         {isModalOpen && selectedProduct && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
//             <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg">
//               <button onClick={closeModal} className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path></svg>
//               </button>
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="h-96 md:h-full">
//                   <img src={selectedProduct.images} alt={selectedProduct.name} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="p-8">
//                   <h2 className="text-3xl font-light mb-2">{selectedProduct.name}</h2>
//                   <p className="text-sm text-gray-300 mb-6 uppercase tracking-widest">{selectedProduct.category}</p>
//                   <p className="text-xl font-serif mb-6">$ {selectedProduct.price}</p>
//                   <p className="text-gray-300 mb-8 leading-relaxed">{selectedProduct.description}</p>
                  
//                   <div className="mb-8">
//                     <p className="text-sm text-gray-400 mb-2">Stock: {selectedProduct.count}</p>
//                     <div className="w-full bg-gray-700 h-2 rounded-full">
//                       <div className="bg-white h-2 rounded-full" style={{ width: `${Math.min(selectedProduct.count / 10 * 100, 100)}%` }}></div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4 mt-8">
//                     <div className="flex items-center space-x-4">
//                       <button
//                         onClick={handleAddToCart}
//                         disabled={isAddedToCart}
//                         className="w-full py-3 bg-white text-black text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                       >
//                         {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
//                       </button>
//                       <Link to="/carts" className="text-white/70 hover:text-white transition-colors">
//                         <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
//                       </Link>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <button
//                         onClick={handleAddToWishlist}
//                         disabled={isAddedToWishlist}
//                         className="w-full py-3 border border-white/30 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 disabled:border-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed"
//                       >
//                         {isAddedToWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
//                       </button>
//                       <Link to="/whishlist" className="text-white/70 hover:text-white transition-colors">
//                          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }








import { toast } from "react-toastify";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Api from "../../../auth/api";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

// Constants for pagination
const PRODUCTS_PER_PAGE = 9;

// --- Skeleton Loader Components ---
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

const ProductSkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

// --- Memoized Product Card Component ---
const ProductCard = React.memo(({ product, onOpenModal, innerRef }) => {
  return (
    <div
      ref={innerRef}
      key={product.id}
      className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden transition-all duration-700 hover:scale-105 cursor-pointer"
      onClick={() => onOpenModal(product)}
    >
      <div className="overflow-hidden">
        <img
          src={product.images}
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
    </div>
  );
});

// --- Main Products Component ---
export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useAuth();
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const res = await Api.get(`/products?_page=${page}&_limit=${PRODUCTS_PER_PAGE}`);
      const activeProducts = res.data.filter(p => p.isActive !== false);

      setProducts(prevProducts => {
        const combinedProducts = [...prevProducts, ...activeProducts];
        const uniqueProducts = combinedProducts.filter(
          (product, index, self) => index === self.findIndex(p => p.id === product.id)
        );
        return uniqueProducts;
      });

      setHasMore(res.data.length === PRODUCTS_PER_PAGE);
    } catch (err) {
      console.error("error", err);
      toast.error("Failed to fetch products.");
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

  const handleAddToCart = useCallback(() => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    addToCart(selectedProduct);
    toast.success(`${selectedProduct.name} added to cart`);
  }, [user, selectedProduct, addToCart]);
  
  const handleAddToWishlist = useCallback(() => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }
    addToWishlist(selectedProduct);
    toast.success(`${selectedProduct.name} added to wishlist!`);
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
          
          {loading && products.length === 0 ? (
            <ProductSkeletonLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((p, index) => {
                if (products.length === index + 1) {
                  return <ProductCard product={p} onOpenModal={openProductModal} key={p.id} innerRef={lastProductElementRef} />;
                } else {
                  return <ProductCard product={p} onOpenModal={openProductModal} key={p.id} />;
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
                 {/* ✅ THIS IS THE CORRECTED LINE */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-96 md:h-full">
                  <img src={selectedProduct.images} alt={selectedProduct.name} className="w-full h-full object-cover" />
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
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleAddToCart}
                        disabled={isAddedToCart}
                        className="w-full py-3 bg-white text-black text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                      <Link to="/carts" className="text-white/70 hover:text-white transition-colors">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleAddToWishlist}
                        disabled={isAddedToWishlist}
                        className="w-full py-3 border border-white/30 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 disabled:border-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed"
                      >
                        {isAddedToWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
                      </button>
                      <Link to="/whishlist" className="text-white/70 hover:text-white transition-colors">
                         <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </Link>
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

// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext"; 

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const { cart } = useCart(); 

// const cartCount = cart.length;
//   // const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 px-6 py-4 text-white sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
        
   
//         <Link 
//           to="/" 
//           className="text-2xl font-serif tracking-[0.3em] font-light transition-all hover:tracking-[0.4em]"
//         >
//           NOIRÉL
//         </Link>

//         <div className="hidden md:flex space-x-8">
//           <Link to="/products" className="text-sm uppercase tracking-widest font-light hover:text-gray-300 transition-all duration-300">Collections</Link>
//           <Link to="/carts" className="text-sm uppercase tracking-widest font-light hover:text-gray-300 transition-all duration-300">Shop</Link>
//           <Link to="/whishlist" className="text-sm uppercase tracking-widest font-light hover:text-gray-300 transition-all duration-300">favorite</Link>
//         </div>

//         <div className="flex items-center space-x-6">

//           {/* Search */}
//           <Link to="/search" className="hover:text-gray-300 transition-colors">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </Link>

//         {user &&(  <Link 
//             to="/profile"
//             className="hover:text-gray-300 transition-colors"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </Link>)} 

//           {user ? (
//             <>
//               <span className="text-sm">Hi, {user.username}</span>
//               <button 
//                 onClick={logout} 
//                 className="hover:text-red-400 transition-colors text-sm"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link to="/login" className="hover:text-gray-300 transition-colors text-sm">
//               Login
//             </Link>
//           )}

// {/* Cart */}
//           <Link to="/carts" className="hover:text-gray-300 transition-colors relative">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//             </svg>
// {/* count */}
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }






































import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Api from "../auth/api";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const cartCount = cart.length;

  useEffect(() => {
    Api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  useEffect(() => {
    if (!query.trim()) return setFiltered([]);
    const lower = query.toLowerCase();
    setFiltered(
      products.filter(
        (p) =>
          p.name?.toLowerCase().includes(lower) ||
          p.description?.toLowerCase().includes(lower) ||
          p.category?.toLowerCase().includes(lower)
      )
    );
  }, [query, products]);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 px-6 py-4 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link
          to="/"
          onClick={handleLinkClick}
          className="text-xl font-serif tracking-[0.25em] font-light transition-all hover:tracking-[0.35em]"
        >
          NOIRÉL
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/products" className="text-xs uppercase tracking-widest hover:text-gray-300">Collections</Link>
          <Link to="/carts" className="text-xs uppercase tracking-widest hover:text-gray-300">Shop</Link>
          <Link to="/whishlist" className="text-xs uppercase tracking-widest hover:text-gray-300">Favorite</Link>
        </div>

        {/* Desktop Search */}
        <div className="relative hidden md:block w-56">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-1.5 rounded-full bg-white/90 text-black text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/60 shadow-md transition"
          />
          {filtered.length > 0 && (
            <div className="absolute mt-2 w-full bg-white text-black rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    navigate(`/products/${p.id}`);
                    setQuery("");
                    setFiltered([]);
                  }}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img src={p.images?.[0]} alt={p.name} className="w-8 h-8 object-cover rounded" />
                  <div>
                    <p className="text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500">${p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 md:space-x-5">
          {/* Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {user && (
              <Link to="/profile" className="hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
            {user ? (
              <>
                <span className="text-xs">Hi, {user.username}</span>
                <button onClick={logout} className="hover:text-red-400 text-xs">Logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-300 text-xs">Login</Link>
            )}
          </div>

          {/* Cart */}
          <Link to="/carts" className="hover:text-gray-300 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-gray-800 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[450px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {/* Mobile Search */}
          <div className="w-11/12">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-full bg-white/90 text-black text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/60 shadow-md"
            />
          </div>

          <Link to="/products" onClick={handleLinkClick} className="text-base tracking-widest font-light">Collections</Link>
          <Link to="/carts" onClick={handleLinkClick} className="text-base tracking-widest font-light">Shop</Link>
          <Link to="/whishlist" onClick={handleLinkClick} className="text-base tracking-widest font-light">Favorite</Link>
          <hr className="w-1/2 border-gray-700" />
          {user && <Link to="/profile" onClick={handleLinkClick} className="text-base tracking-widest">Profile</Link>}
          {user ? (
            <button onClick={() => { logout(); handleLinkClick(); }} className="text-base tracking-widest text-red-400">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={handleLinkClick} className="text-base tracking-widest">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

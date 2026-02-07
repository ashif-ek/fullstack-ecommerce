import { Link } from "react-router-dom";

export default function Dashboard({ cart, wishlist, handleLogout }) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          to="/carts"
          className="flex items-center space-x-6 p-6 bg-gray-900/50 border border-white/10 rounded-lg hover:bg-gray-900 transition-colors"
        >
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div>
            <h3 className="text-xl tracking-wider">My Cart</h3>
            <p className="text-gray-400">{cart.length} item(s)</p>
          </div>
        </Link>
        <Link
          to="/whishlist"
          className="flex items-center space-x-6 p-6 bg-gray-900/50 border border-white/10 rounded-lg hover:bg-gray-900 transition-colors"
        >
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <div>
            <h3 className="text-xl tracking-wider">My Wishlist</h3>
            <p className="text-gray-400">{wishlist.length} item(s)</p>
          </div>
        </Link>
      </div>
      <div className="text-center pt-6">
        <button
          onClick={handleLogout}
          className="border border-red-500/50 text-red-500 px-6 py-2 text-xs tracking-widest uppercase hover:bg-red-500/20 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

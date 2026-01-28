
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom"; 
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { toast } from "react-toastify";


export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white font-light">
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-4 tracking-wider">Your Wishlist</h1>
          <div className="w-20 h-px bg-white/40 mx-auto"></div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 border border-white/10 rounded-lg">
            <p className="text-gray-400 mb-6 text-lg">Your wishlist is empty. Let's find something you'll love.</p>
            <Link
              to="/products" // Adjust link to your products page route
              className="inline-block bg-white text-black text-sm tracking-widest uppercase px-6 py-3 hover:bg-gray-200 transition-colors duration-300"
            >
              Explore the Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden group"
              >
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-xl font-light mb-2 tracking-wider">{item.name}</h2>
                  <p className="text-xl font-serif mb-4">$ {item.price}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        addToCart(item);
                        toast.info(`${item.name} added to cart!`);
                      }}
                      className="flex-1 text-xs tracking-widest uppercase border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove from Wishlist"
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
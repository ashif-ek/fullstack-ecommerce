import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../../../auth/api";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";
import { Home, Package } from "lucide-react"; // icons


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    Api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("API error:", err));
  }, [id]);

  if (!product) {
    return <div className="text-center mt-20 text-gray-400">Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white px-6 py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-gray-900 to-black rounded-xl shadow-lg p-8 relative">
          
          {/* Icons inside modal (top-right corner) */}
          <div className="absolute top-4 right-4 flex gap-4">
            <Link
              to="/"
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="Home"
            >
              <Home size={22} />
            </Link>
            <Link
              to="/products"
              className="p-2 rounded-full hover:bg-white/10 transition"
              title="Products"
            >
              <Package size={22} />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Image */}
            <div className="flex-1">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl font-light tracking-wide">{product.name}</h1>
              <p className="text-gray-400">{product.category}</p>
              <p className="text-lg">{product.description}</p>
              <p className="text-2xl font-semibold">${product.price}</p>

              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="px-6 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWishlist(product)}
                  className="px-6 py-2 rounded-full border border-white/40 hover:bg-white/10 transition"
                >
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}


import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white font-light">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-4 tracking-wider">Shopping Cart</h1>
          <div className="w-20 h-px bg-white/40 mx-auto"></div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 border border-white/10 rounded-lg">
            <p className="text-gray-400 mb-6 text-lg">Your cart is currently empty.</p>
            <Link 
              to="/products"
              className="inline-block bg-white text-black text-sm tracking-widest uppercase px-6 py-3 hover:bg-gray-200 transition-colors duration-300"
            >
              Discover Our Collection
            </Link>
          </div>
        ) : (
          <div>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center p-4 border border-white/10 rounded-lg bg-gray-900/50"
                >

                  <div className="md:col-span-2 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <p className="text-lg tracking-wide">{item.name}</p>
                      <p className="text-gray-400 text-sm">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="md:col-span-2 text-center md:text-right">
                    <p className="text-xl font-serif">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-400 transition-colors text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>


            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-4">
                <button
                  onClick={clearCart}
                  className="border border-red-500/50 text-red-500 px-5 py-2 text-xs tracking-widest uppercase hover:bg-red-500/20 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-3xl font-serif">${total.toFixed(2)}</p>
                <br />
                <Link to="/checkout"
                className="w-full mt-4 bg-white text-black text-sm tracking-widest uppercase px-6 py-3 hover:bg-gray-200 transition-colors duration-300"
                >
                  Proceed to Checkout
                </Link>
               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}


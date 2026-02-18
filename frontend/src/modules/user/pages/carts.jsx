import React, { useEffect } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ArrowRight } from "lucide-react";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="mb-20 text-center">
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight font-light mb-4">Your Selection</h1>
            <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">Complimentary Shipping & Returns</p>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-t border-b border-white/10">
              <p className="text-gray-400 font-light text-xl mb-8">Your cart is currently empty.</p>
              <Link 
                to="/products"
                className="group flex items-center gap-4 text-sm tracking-[0.2em] uppercase border-b border-white/30 pb-1 hover:border-white transition-all"
              >
                Continue Shopping <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* Product List - 8 Cols */}
              <div className="lg:col-span-8 space-y-0">
                {/* Table Header (Hidden on mobile) */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/20 text-xs uppercase tracking-[0.2em] text-gray-500">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="group py-8 border-b border-white/5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-6">
                        <Link to={`/products/${item.id}`} className="block h-32 w-24 bg-gray-900 overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </Link>
                        <div className="flex flex-col justify-between py-1">
                            <div>
                                <h3 className="text-lg font-light tracking-wide mb-1">{item.name}</h3>
                                <p className="text-xs text-gray-500 tracking-wider uppercase">Eau de Parfum</p>
                            </div>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-gray-600 hover:text-red-400 transition-colors text-left flex items-center gap-1 w-fit"
                            >
                                <X size={12} /> Remove
                            </button>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center font-light text-gray-300">
                        ${item.price}
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-white/20 px-3 py-2 gap-4">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-gray-400 transition-colors">
                                <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-gray-400 transition-colors">
                                <Plus size={12} />
                            </button>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 text-right font-serif text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <button 
                    onClick={clearCart}
                    className="mt-8 text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-white w-fit"
                >
                    Clear Shopping Bag
                </button>
              </div>

              {/* Summary - 4 Cols */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-neutral-900/20 border border-white/5 p-8 lg:sticky lg:top-32">
                    <h2 className="text-xl font-serif mb-8 border-b border-white/10 pb-4">Order Summary</h2>
                    
                    <div className="space-y-4 text-sm font-light text-gray-400">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="text-white">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-white uppercase text-xs">Complimentary</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (Estimated)</span>
                            <span className="text-white">$0.00</span>
                        </div>
                    </div>

                    <div className="border-t border-white/10 my-6 pt-6 flex justify-between items-baseline">
                        <span className="text-sm uppercase tracking-widest">Total</span>
                        <span className="text-3xl font-serif text-white">${total.toFixed(2)}</span>
                    </div>

                    <Link 
                        to="/checkout"
                        className="w-full block text-center bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors mb-4"
                    >
                        Proceed to Checkout
                    </Link>

                    <p className="text-[10px] text-center text-gray-600 leading-relaxed">
                        Secure Checkout. By proceeding, you agree to our Terms and Conditions.
                    </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

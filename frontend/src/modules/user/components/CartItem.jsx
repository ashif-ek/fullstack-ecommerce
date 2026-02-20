import React, { memo } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";

const CartItem = memo(({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="group py-8 border-b border-white/5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      
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
  );
});

export default CartItem;



import { useState } from "react";
import { Link } from "react-router-dom";
import Api from "../services/api";
import { toast } from "react-toastify";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await Api.post("/communication/newsletter/", { email });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error("Newsletter error:", err);
      toast.error("Subscription failed. Try again.");
    }
  };

  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          

          <div className="space-y-4">
            <h2 className="text-2xl font-serif tracking-[0.3em] text-white font-light">NOIRÉL</h2>
            <p className="text-sm max-w-xs leading-relaxed">
              Crafting exceptional fragrances that capture moments of elegance and sophistication.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13.5v9l7-4.5-7-4.5z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-5-7h10v-2H7v2z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13.5v9l7-4.5-7-4.5z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-4 font-light">Shop</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300">All Fragrances</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300">For Women</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300">For Men</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300">Gift Sets</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300">Limited Editions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-4 font-light">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors duration-300">Contact Us</Link></li>
              <li><Link to="/shipping-returns" className="text-sm hover:text-white transition-colors duration-300">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-white transition-colors duration-300">FAQ</Link></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300">Store Locator</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors duration-300">Care Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-4 font-light">Stay Connected</h3>
            <p className="text-sm mb-4 leading-relaxed">Subscribe to receive updates on new collections and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900 border border-gray-700 px-4 py-2 text-sm focus:outline-none focus:border-white transition-colors"
              />
              <button 
                type="submit" 
                className="bg-white text-black text-sm py-2 hover:bg-gray-100 transition-colors duration-300 uppercase tracking-widest font-light"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} NOIRÉL. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
// Removed toast import
import React, { useEffect, useState, memo } from "react";
import Api from "../../../services/api";
import { Link } from "react-router-dom";
import ProductCardSkeleton from "../../../components/ProductCardSkeleton";
import { ArrowRight } from "lucide-react";

const TopProductCard = memo(({ product, index }) => {
  const getImageUrl = (itm) => {
    let img = Array.isArray(itm.images) && itm.images.length > 0 
        ? (itm.images[0].image || "") 
        : (itm.image || "");

    if (img && typeof img === "string" && img.startsWith("/")) {
        return `${import.meta.env.VITE_API_URL}${img}`;
    }
    return img;
  };
    
  const imageUrl = getImageUrl(product);

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative block"
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-900 border border-white/5">
        {imageUrl ? (
            <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                loading="lazy"
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-700">No Image</div>
        )}
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick Add Button / Action (Optional, simplistic for now) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
             <span className="text-xs uppercase tracking-[0.2em] text-white border-b border-white pb-1">View Details</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-light tracking-wide text-white group-hover:text-gray-300 transition-colors">
          {product.name}
        </h3>
        {product.category && (
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                {product.category}
            </p>
        )}
        <p className="text-base font-serif text-white/90">
            ${product.price}
        </p>
      </div>
    </Link>
  );
});

export default function TopSellingProducts() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      setLoading(true);
      try {
        const res = await Api.get("/products/top_selling/?limit=4");
        const products = Array.isArray(res.data) ? res.data : [];
        setTopProducts(products);
      } catch (err) {
        console.error("Top products error:", err);
        setTopProducts([]);
      } finally {
        setTimeout(() => setLoading(false), 500); // Slight delay for smooth transition
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <section className="py-32 px-6 bg-black text-white relative overflow-hidden">
      
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-900/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4 block">Curated Collection</span>
                <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight">
                    Most Coveted <span className="italic text-gray-500">Scents</span>
                </h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-[0.2em] hover:text-gray-400 transition-colors group">
                View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {topProducts.map((product, index) => (
                <TopProductCard key={product.id} product={product} index={index} />
            ))}
            </div>
        )}

        <div className="mt-16 md:hidden text-center">
            <Link to="/products" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] border-b border-white/30 pb-1">
                View All Collection
            </Link>
        </div>
      </div>
    </section>
  );
}

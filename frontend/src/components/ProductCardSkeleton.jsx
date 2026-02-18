import React from "react";

const ProductCardSkeleton = () => (
  <div className="bg-neutral-900/50 rounded-lg overflow-hidden border border-white/5 relative group">
    {/* Image Placeholder with Shimmer */}
    <div className="h-[400px] bg-white/5 relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
    
    {/* Content Placeholder */}
    <div className="p-6 space-y-4 text-center">
      {/* Title */}
      <div className="h-4 w-3/4 bg-white/5 mx-auto rounded relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      
      {/* Category */}
      <div className="h-3 w-1/2 bg-white/5 mx-auto rounded relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      
      {/* Price */}
      <div className="h-5 w-1/4 bg-white/5 mx-auto rounded relative overflow-hidden mt-2">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;

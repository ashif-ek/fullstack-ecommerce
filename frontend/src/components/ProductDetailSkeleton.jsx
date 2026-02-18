import React from "react";

const ShimmerBlock = ({ className }) => (
  <div className={`bg-gray-800 relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
  </div>
);

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      {/* Breadcrumb Skeleton */}
      <div className="max-w-7xl mx-auto pt-24 mb-12">
        <ShimmerBlock className="h-4 w-48 rounded" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Gallery Section Skeleton */}
        <div className="lg:col-span-7 space-y-6">
           <ShimmerBlock className="aspect-[4/5] w-full rounded-sm" />
           <div className="flex gap-4">
             {[1, 2, 3].map((i) => (
               <ShimmerBlock key={i} className="h-24 w-24 rounded-sm" />
             ))}
           </div>
        </div>

        {/* Info Section Skeleton */}
        <div className="lg:col-span-5 space-y-8 mt-12 lg:mt-32">
           <ShimmerBlock className="h-12 w-3/4 rounded" /> {/* Title */}
           <div className="flex justify-between">
              <ShimmerBlock className="h-8 w-24 rounded" /> {/* Price */}
              <ShimmerBlock className="h-6 w-32 rounded" /> {/* Rating */}
           </div>
           
           <div className="space-y-4">
             <ShimmerBlock className="h-4 w-full rounded" />
             <ShimmerBlock className="h-4 w-full rounded" />
             <ShimmerBlock className="h-4 w-2/3 rounded" />
           </div>

           <div className="flex gap-2 pt-4">
             <ShimmerBlock className="h-14 w-full rounded" /> {/* Button */}
             <ShimmerBlock className="h-14 w-full rounded" /> {/* Button */}
           </div>
        </div>

      </div>
    </div>
  );
}

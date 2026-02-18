import React from "react";

const ShimmerBlock = ({ className }) => (
  <div className={`bg-white/10 relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
  </div>
);

export default function HeroSkeleton() {
  return (
    <section className="relative h-screen h-[100dvh] w-full bg-black overflow-hidden flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32">
       {/* Background Pulse */}
       <div className="absolute inset-0 bg-neutral-900 animate-pulse z-0" />
       
       <div className="relative z-10 max-w-5xl w-full pt-20">
            {/* Decorative Line */}
            <ShimmerBlock className="h-[2px] w-24 mb-6" />

            {/* Subtitle */}
            <ShimmerBlock className="h-4 w-48 mb-6 rounded" />

            {/* Title (Giant - Multiple Lines) */}
            <div className="space-y-4 mb-10">
                <ShimmerBlock className="h-16 sm:h-20 md:h-24 lg:h-32 w-3/4 rounded-sm" />
                <ShimmerBlock className="h-16 sm:h-20 md:h-24 lg:h-32 w-1/2 rounded-sm" />
            </div>

            {/* Description */}
            <div className="space-y-3 mb-12 max-w-lg">
                <ShimmerBlock className="h-4 w-full rounded" />
                <ShimmerBlock className="h-4 w-5/6 rounded" />
                <ShimmerBlock className="h-4 w-4/6 rounded" />
            </div>

            {/* Buttons */}
            <div className="flex gap-6">
                <ShimmerBlock className="h-14 w-48 rounded-sm" />
                <ShimmerBlock className="h-14 w-48 rounded-sm" />
            </div>
       </div>

       {/* Controls Skeleton */}
       <div className="absolute bottom-0 left-0 w-full z-30 px-6 sm:px-12 md:px-20 lg:px-32 py-10 md:py-12">
            <div className="flex items-end justify-end gap-x-6 border-t border-white/10 pt-6">
                 {/* Progress Bars */}
                 <div className="flex gap-2">
                     {[1, 2, 3].map(i => (
                         <div key={i} className="h-12 w-12 flex items-center justify-center">
                             <div className="h-[2px] w-full bg-white/10" />
                         </div>
                     ))}
                 </div>
                 {/* Counter */}
                 <ShimmerBlock className="h-8 w-24 rounded" />
            </div>
       </div>
    </section>
  );
}

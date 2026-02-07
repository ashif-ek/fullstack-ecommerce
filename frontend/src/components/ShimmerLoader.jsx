import React from "react";

export default function ShimmerLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {/* Card skeleton example */}
      <div className="w-[90%] max-w-md bg-gray-200 rounded-xl overflow-hidden relative">
        <div className="h-40 bg-gray-300 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
        </div>

        <div className="p-4 space-y-3">
          <div className="h-4 w-3/4 bg-gray-300 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-4 w-1/2 bg-gray-300 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import TableSkeleton from "./TableSkeleton";

const UserOverviewSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50/70 min-h-screen font-sans animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-shimmer"></div>
        <div className="h-4 w-96 bg-gray-200 rounded animate-shimmer"></div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 h-24 relative overflow-hidden"
          >
             <div className="absolute inset-0 animate-shimmer"></div>
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 mb-6 overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200">
           <div className="w-full md:flex-grow h-10 bg-gray-100 rounded animate-shimmer"></div>
           <div className="w-full md:w-32 h-10 bg-gray-100 rounded animate-shimmer"></div>
        </div>
        
        {/* Reuse Table Skeleton */}
        <div className="p-0">
             <TableSkeleton rows={5} cols={5} />
        </div>
      </div>
    </div>
  );
};

export default UserOverviewSkeleton;

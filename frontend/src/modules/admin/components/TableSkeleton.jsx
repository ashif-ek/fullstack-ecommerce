import React from "react";

const TableSkeleton = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="w-full">
      {/* Header Skeleton */}
      <div className="flex items-center space-x-4 p-4 border-b border-gray-100 bg-gray-50">
        {[...Array(cols)].map((_, i) => (
          <div key={`head-${i}`} className="h-4 rounded w-1/5 animate-shimmer" />
        ))}
      </div>
      
      {/* Rows Skeleton */}
      {[...Array(rows)].map((_, rIndex) => (
        <div key={`row-${rIndex}`} className="flex items-center space-x-4 p-4 border-b border-gray-50">
          {[...Array(cols)].map((_, cIndex) => (
            <div key={`cell-${rIndex}-${cIndex}`} className="h-4 rounded w-1/5 animate-shimmer" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;

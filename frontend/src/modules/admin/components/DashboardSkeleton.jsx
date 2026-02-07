import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <main className="flex-1 overflow-auto">
        {/* Header Skeleton */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between mb-6">
          <div className="h-8 rounded w-48 animate-shimmer"></div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full animate-shimmer"></div>
            <div className="h-8 w-32 rounded animate-shimmer"></div>
          </div>
        </div>

        <div className="p-6 space-y-6">
           {/* Section Title Skeleton */}
           <div className="h-8 rounded w-64 mb-6 animate-shimmer"></div>

           {/* KPI Cards Skeleton */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[...Array(4)].map((_, i) => (
               <div key={`kpi-${i}`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="flex justify-between items-center">
                   <div className="space-y-3 flex-1">
                     <div className="h-4 rounded w-24 animate-shimmer"></div>
                     <div className="h-8 rounded w-16 animate-shimmer"></div>
                     <div className="h-4 rounded w-20 animate-shimmer"></div>
                   </div>
                   <div className="h-12 w-12 rounded-lg animate-shimmer"></div>
                 </div>
               </div>
             ))}
           </div>

           {/* Charts Grid Skeleton */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Revenue Chart Skeleton */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
               <div className="flex justify-between mb-6">
                 <div className="h-6 rounded w-32 animate-shimmer"></div>
                 <div className="h-6 rounded w-24 animate-shimmer"></div>
               </div>
               <div className="h-80 rounded animate-shimmer"></div>
             </div>

             {/* Pie Chart Skeleton */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="h-6 rounded w-32 mb-6 animate-shimmer"></div>
               <div className="h-80 rounded-full mx-auto w-64 animate-shimmer"></div>
             </div>
           </div>

           {/* Bottom Grid Skeleton */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {/* Stock Levels Skeleton */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="h-6 rounded w-32 mb-6 animate-shimmer"></div>
               <div className="space-y-4">
                 {[...Array(5)].map((_, i) => (
                   <div key={`stock-${i}`} className="flex items-center space-x-4">
                     <div className="h-4 rounded w-1/4 animate-shimmer"></div>
                     <div className="h-4 rounded flex-1 animate-shimmer"></div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Recent Orders Skeleton */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="flex justify-between mb-6">
                 <div className="h-6 rounded w-32 animate-shimmer"></div>
                 <div className="h-4 rounded w-16 animate-shimmer"></div>
               </div>
               <div className="space-y-4">
                 {[...Array(5)].map((_, i) => (
                   <div key={`order-${i}`} className="flex justify-between items-center border border-gray-100 p-4 rounded-lg">
                     <div className="flex items-center gap-3">
                       <div className="h-12 w-12 rounded-lg animate-shimmer"></div>
                       <div className="space-y-2">
                         <div className="h-4 rounded w-32 animate-shimmer"></div>
                         <div className="h-3 rounded w-20 animate-shimmer"></div>
                       </div>
                     </div>
                     <div className="space-y-2 text-right">
                       <div className="h-4 rounded w-16 ml-auto animate-shimmer"></div>
                       <div className="h-6 rounded w-20 ml-auto animate-shimmer"></div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSkeleton;

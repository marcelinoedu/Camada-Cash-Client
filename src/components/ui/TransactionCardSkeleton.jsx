import React from "react";

export default function TransactionCardSkeleton() {
  return (
    <div className="w-[300px] h-[120px] p-4 rounded-lg shadow-sm border border-gray-200 bg-gray-100 animate-pulse flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
        <div className="h-4 w-4 bg-gray-300 rounded" />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="h-4 w-1/3 bg-gray-300 rounded" />
        <div className="h-3 w-1/4 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

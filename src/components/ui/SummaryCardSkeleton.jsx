import React from "react";

export default function SummaryCardSkeleton() {
  return (
    <div
      className={`
        bg-gray-100 p-4 w-full max-w-[300px]
        rounded-2xl shadow-md shadow-gray-200
        animate-pulse space-y-2
      `}
    >
      <div className="h-4 w-1/2 bg-gray-300 rounded" />
      <div className="h-6 w-3/4 bg-gray-300 rounded" />
    </div>
  );
}

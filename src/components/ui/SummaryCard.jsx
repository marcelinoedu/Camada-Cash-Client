import React from "react";

export default function SummaryCard({ label, value, color = "text-gray-800", borderTop = "" }) {
  return (
    <div
      className={`
        bg-white p-4 w-full max-w-[300px]
        rounded-2xl shadow-md shadow-gray-200
        transition-all duration-200 ease-in-out
        ${borderTop}
      `}
    >
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-lg font-semibold ${color}`}>{value}</p>
    </div>
  );
}

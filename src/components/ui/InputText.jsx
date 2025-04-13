import React, { useState } from "react";
import { motion } from "framer-motion";

export default function InputText({ label, name, value, onChange, type = "text", placeholder = "", icon: Icon, onIconClick }) {
  const [isFocused, setIsFocused] = useState(false);

  const shouldFloat = isFocused || value;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    if (!e.target.value) setIsFocused(false);
  };

  return (
    <div className="w-full mb-6 relative">
      <div className="relative">
        <motion.label
          initial={false}
          animate={shouldFloat ? {
            top: "-12px",
            left: "12px",
            fontSize: "12px",
            backgroundColor: "white",
            padding: "0 4px",
          } : {
            top: "50%",
            left: "16px",
            fontSize: "16px",
            backgroundColor: "transparent",
            padding: "0 4px",
            translateY: "-50%"
          }}
          transition={{ duration: 0.2 }}
          className="absolute text-gray-600 pointer-events-none z-10"
        >
          {label}
        </motion.label>

        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2D61F0] focus:border-transparent text-sm relative z-0 pr-${Icon ? '10' : '4'}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        />

        {Icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-20"
          >
            <Icon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { ColorVariants } from "@/config/ColorVariants";

export default function Button({
  variant = "primary",
  icon: Icon,
  children,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const color = ColorVariants[variant] || ColorVariants.primary;

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={`cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 text-sm shadow-md ${color.bg} ${color.text} ${color.hover} ${color.ring} ${color.border} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children && <span>{children}</span>}
    </motion.button>
  );
}
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Tooltip({ message, children, disabled = false }) {
  const [show, setShow] = React.useState(false);

  if (disabled) return children;

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ overflow: "visible" }}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-lg z-[9999] whitespace-nowrap"
            style={{ overflow: "visible" }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

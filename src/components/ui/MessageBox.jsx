import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ColorVariants } from "@/config/ColorVariants";
import { motion, AnimatePresence } from "framer-motion";

export default function MessageBox({ message, variant = "primary", onClose, className = "" }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const color = ColorVariants[variant] || ColorVariants.primary;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setVisible(false);
          onClose?.();
          return 0;
        }
        return prev - 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-full max-w-md ${className}`}
        >
          <div className={`relative flex items-start gap-3 p-4 rounded-xl shadow-lg ${color.bg} ${color.text}`}>
            <span className="text-sm font-medium leading-tight flex-1 break-words">
              {message}
            </span>
            <button
              onClick={() => {
                setVisible(false);
                onClose?.();
              }}
              className="absolute top-2 right-2 text-inherit hover:opacity-80 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <motion.div
              className={`absolute bottom-0 left-0 h-[3px] rounded-b-xl ${color.text}`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.03, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-t-transparent border-r-white border-b-[#2D61F0] border-l-[#2D61F0] animate-spin"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
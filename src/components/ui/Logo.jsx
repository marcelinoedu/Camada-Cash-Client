import Image from "next/image";
import { Roboto } from "next/font/google";
import { motion } from "framer-motion";

const roboto = Roboto({
  weight: ["500", "700", "800"],
  subsets: ["latin"],
});

export default function Logo({ minimized = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-1 select-none bg-transparent px-3 py-2 rounded-xl"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={48}
        height={48}
        className="object-contain"
        priority
      />
      {!minimized && (
        <span className={`${roboto.className} text-xl font-bold text-[#2D61F0]`}>
          Camada <span className="font-bold">Cash</span>
        </span>
      )}
    </motion.div>
  );
}

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tabs } from "@/config/Tabs";
import { motion } from "framer-motion";

export default function MobileSideBar() {
  const router = useRouter();

  return (
    <nav className="mx-2 mb-2 flex justify-around items-end bg-white py-3 px-4 rounded-2xl">
      {Tabs.map((tab) => {
        const isActive = router.pathname === tab.href;
        const Icon = tab.icon;

        return (
          <motion.div
            key={tab.href}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center"
          >
            <Link href={tab.href} className="w-full flex justify-center">
              <div className="relative flex flex-col items-center justify-end">
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute w-12 h-12 bg-[#2D61F0] rounded-full shadow-lg flex items-center justify-center"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                )}
                {!isActive && (
                  <div className="flex flex-col items-center text-gray-500 hover:text-[#2D61F0] transition-all text-xs">
                    <Icon className="w-5 h-5 mb-0.5" />
                    <span className="text-[10px]">{tab.label}</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
